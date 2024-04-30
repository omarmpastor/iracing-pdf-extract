declare class iRacingWeek {
    number: number;
    date: string;
    track: string;
    trackLocalTime: string;
    duration: string;
    constructor(number: number, date: string, track: string, duration: string);
}
declare class iRacingSerie {
    name: string;
    groupSeries: string;
    license: string;
    cars: string[];
    weeks: iRacingWeek[];
    constructor(name: string, groupSeries: string);
}
declare class iRacingDiscipline {
    name: string;
    series: iRacingSerie[];
    constructor(name: string);
    addSerie(serie: iRacingSerie): void;
}
declare class iRacingSchedule {
    disciplines: iRacingDiscipline[];
    constructor(disciplines: iRacingDiscipline[]);
}
export { iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek };
//# sourceMappingURL=iRacingSchedule.d.ts.map