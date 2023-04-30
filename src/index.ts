import { parsePDF } from 'pdf-text-extract'
import iracingParse from './iRacingParsePDF'
import { iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek } from './iRacingSchedule'

const parseIRacingSchedule = async (pdfArrayBuffer : ArrayBuffer) => {
    const pdf = await parsePDF(pdfArrayBuffer);
    return iracingParse(pdf);
};

export { parseIRacingSchedule, iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek };