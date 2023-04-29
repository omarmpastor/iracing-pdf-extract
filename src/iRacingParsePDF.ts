import 'core-js';
import { PDFDocument, PDFItem, PDFLine } from 'pdf-text-extract';
import { iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek } from './iRacingSchedule';

const regexIndexLine = new RegExp(/^^((?![ ][.]).)*([ ][.]){1,}[ ]?\d{1,3}/i);

const buildScheduleFromIndex = (pdf : any) => {
    let linesIndex = pdf.pages.flatMap((p : any) => p.lines.filter((l : any) => regexIndexLine.test(l.text)));

    // Get first pos from all lines
    const linesStartWithTemp = linesIndex.map((l : any) => l.items[0].x);
    // Remove dulicates and sort
    const linesStartWith = [...new Set(linesStartWithTemp)].sort();

    // decides what type it is depending on the x of the first word (depending on the indentation)
    let disciplines : iRacingDiscipline[] = [];
    let discipline;
    let groupSerie : string = "";
    for (const line of linesIndex) {
        const regexTitle = new RegExp(/^((?![ ][.]).)*/i);
        const titleMatch = regexTitle.exec(line.text);
        if(titleMatch != null) {
            const title = titleMatch[0].trim();
            switch(line.items[0].x) {
                case linesStartWith[0]:
                    groupSerie = "";
                    discipline = new iRacingDiscipline(title);
                    disciplines.push(discipline);
                    break;
                case linesStartWith[1]:
                    groupSerie = title;
                    break;
                case linesStartWith[2]:
                    const serie = new iRacingSerie(title, groupSerie);
                    if(discipline != undefined) {
                        (<iRacingDiscipline>discipline).addSerie(serie);
                    }
                    
                    break;
            }
        }
        
    }

    if (discipline != null) disciplines.push(discipline);

    return new iRacingSchedule(disciplines);
};

const fillSerieFromLines = (serie : iRacingSerie, linesSerie : PDFLine[]) => {
    const indexWeekLines = linesSerie.map((line, i) => line.text.startsWith('Week ') ? i : -1)
        .filter(i => i !== -1);

    if(!indexWeekLines || indexWeekLines.length < 1) return; // No Weeks found

    const indexClassHeader = linesSerie.slice(0, indexWeekLines[0])
        .findIndex(l => l.text.includes('-->') || l.text.startsWith('Restricted to select members'));
    
    serie.cars = linesSerie.slice(0, indexClassHeader).map(l => l.text).join(' ').split(',').map(c => c.trim());
    serie.license = linesSerie[indexClassHeader].text;

    for (let i = 0; i < indexWeekLines.length - 1; i++) {
        const linesWeek = linesSerie.slice(indexWeekLines[i], indexWeekLines[i + 1]);
        //const colsGroup = linesWeek.flatMap(l => l.items).group((i : PDFItem) => i.x);
        const allItems = linesWeek.flatMap(l => l.items);

        // Group items for columns (item.x)
        const colsGroup = allItems.reduce((acc : any, item : PDFItem) => {
            let groupKey = item.x;
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        }, {});
        
        let lines : any = []; // No PDFLine!!!
        Object.getOwnPropertyNames(colsGroup).forEach(line => {
            const lineOrderByX = colsGroup[line].sort((a : any, b : any) => a.x - b.x);
            lines.push(lineOrderByX);
        });

        const col1Week = lines[0].map((i : PDFItem) => i.str).join(' ').trim();
        const col2Track = lines[1].map((i : PDFItem) => i.str).join(' ').trim();
        const col4Duration = lines[3].map((i : PDFItem) => i.str).join(' ').trim();

        const regexpCol1Week = /^Week (\d+) \((\d{4}-\d{2}-\d{2})\)/i;
        const matchCol1 = col1Week.match(regexpCol1Week);

        const regexpCol2Week = /^(.*) \((.*)\)/i;
        const matchCol2 = col2Track.match(regexpCol2Week);
        const matchTrackLocaltime = matchCol2[2].match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) ?(\dx)?/i);
        
        const week = new iRacingWeek(matchCol1[1], matchCol1[2], matchCol2[1], col4Duration);
        
        if(matchTrackLocaltime && matchTrackLocaltime.length > 1)
        {
            week.trackLocalTime = matchTrackLocaltime[1] + ' ' + matchTrackLocaltime[2];
        }
        
        serie.weeks.push(week);
    }
};

const fillSerie = (lines : PDFLine[], currentSerie : iRacingSerie, nextSerieName : string) => {
    const indexCurrentSerie = lines.findIndex(l => l.text == currentSerie.name);
    let indexNextSerie;
    if(nextSerieName.length > 0) {
        indexNextSerie = lines.findIndex(l => l.text == nextSerieName);
    }
    else {
        indexNextSerie = lines.length;
    }
    
    let linesCurrentSerie : PDFLine[];
    if(indexCurrentSerie < indexNextSerie) {
        linesCurrentSerie = lines.slice(indexCurrentSerie + 1, indexNextSerie);
    } else {
        linesCurrentSerie = [];
    }

    fillSerieFromLines(currentSerie, linesCurrentSerie);
};

/**
 * 
 * @param {PDFDocument} pdf 
 * @param {iRacingSchedule} schedule 
 */
const fillSeries = (pdf : PDFDocument, schedule : iRacingSchedule) => {
    const allLines = pdf.pages.flatMap(p => p.lines);
    const allSeries = schedule.disciplines.flatMap(p => p.series);
    let lastIndexLine = -1;
    for (let i = 0; i < allLines.length; i++) {
        if(regexIndexLine.test(allLines[i].text)) lastIndexLine = i;
    };

    if(lastIndexLine > allLines.length - 1) lastIndexLine = allLines.length - 1;



    for (let i = 0; i < allSeries.length; i++) {
        let nextSerie = '';
        if(i < allSeries.length - 1) {
            nextSerie = allSeries[i + 1].name;
        }

        fillSerie(allLines.slice(lastIndexLine), allSeries[i], nextSerie);
    };
};

const parsePDF = (pdf : PDFDocument) : iRacingSchedule => {
    const schedule = buildScheduleFromIndex(pdf);
    fillSeries(pdf, schedule);
    return schedule;
};

export default parsePDF;
