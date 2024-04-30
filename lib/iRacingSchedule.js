"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iRacingWeek = exports.iRacingSerie = exports.iRacingDiscipline = exports.iRacingSchedule = void 0;
class iRacingWeek {
    constructor(number, date, track, duration) {
        this.number = number;
        this.date = date;
        this.track = track;
        this.duration = duration;
        this.trackLocalTime = '';
    }
}
exports.iRacingWeek = iRacingWeek;
class iRacingSerie {
    constructor(name, groupSeries) {
        this.name = name;
        this.groupSeries = groupSeries;
        this.license = '';
        this.cars = [];
        this.weeks = [];
    }
}
exports.iRacingSerie = iRacingSerie;
class iRacingDiscipline {
    constructor(name) {
        this.name = name;
        this.series = [];
    }
    addSerie(serie) {
        this.series.push(serie);
    }
}
exports.iRacingDiscipline = iRacingDiscipline;
class iRacingSchedule {
    constructor(disciplines) {
        this.disciplines = disciplines;
    }
}
exports.iRacingSchedule = iRacingSchedule;
