"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iRacingWeek = exports.iRacingSerie = exports.iRacingDiscipline = exports.iRacingSchedule = exports.parseIRacingSchedule = void 0;
const pdf_text_extract_1 = require("pdf-text-extract");
const iRacingParsePDF_1 = __importDefault(require("./iRacingParsePDF"));
const iRacingSchedule_1 = require("./iRacingSchedule");
Object.defineProperty(exports, "iRacingSchedule", { enumerable: true, get: function () { return iRacingSchedule_1.iRacingSchedule; } });
Object.defineProperty(exports, "iRacingDiscipline", { enumerable: true, get: function () { return iRacingSchedule_1.iRacingDiscipline; } });
Object.defineProperty(exports, "iRacingSerie", { enumerable: true, get: function () { return iRacingSchedule_1.iRacingSerie; } });
Object.defineProperty(exports, "iRacingWeek", { enumerable: true, get: function () { return iRacingSchedule_1.iRacingWeek; } });
const parseIRacingSchedule = async (pdfPath) => {
    const pdf = await (0, pdf_text_extract_1.parsePDF)(pdfPath);
    return (0, iRacingParsePDF_1.default)(pdf);
};
exports.parseIRacingSchedule = parseIRacingSchedule;
