import { parsePDF } from 'pdf-text-extract'
import iracingParse from './iRacingParsePDF'
import { iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek } from './iRacingSchedule'

const parseIRacingSchedule = async (pdfPath : string) => {
    const pdf = await parsePDF(pdfPath);
    return iracingParse(pdf);
};

export { parseIRacingSchedule, iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek };