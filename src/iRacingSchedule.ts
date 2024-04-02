class iRacingWeek {
  number: number;
  date: string;
  track: string;
  trackLocalTime: string;
  duration: string;

  constructor(number: number, date: string, track: string, duration: string) {
    this.number = number;
    this.date = date;
    this.track = track;
    this.duration = duration;
    this.trackLocalTime = '';
  }
}

class iRacingSerie {
  name: string;
  groupSeries: string;
  license: string;
  cars: string[];
  weeks: iRacingWeek[];
  bookmarks: boolean;

  constructor(name: string, groupSeries: string) {
    this.name = name;
    this.groupSeries = groupSeries;
    this.license = '';
    this.cars = [];
    this.weeks = [];
    this.bookmarks = false;
  }
}

class iRacingDiscipline {
  name: string;
  series: iRacingSerie[];
  constructor(name: string) {
    this.name = name;
    this.series = [];
  }

  addSerie(serie: iRacingSerie): void {
    this.series.push(serie);
  }
}

class iRacingSchedule {
  disciplines: iRacingDiscipline[];
  constructor(disciplines: iRacingDiscipline[]) {
    this.disciplines = disciplines;
  }
}

export { iRacingSchedule, iRacingDiscipline, iRacingSerie, iRacingWeek };
