let weekDay = [
  "sunday",
  "monday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

let forecast = (data) => {
  let displayContent;
  for (i = 0; i < 16; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let dayForecast = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${
      weekDay[d.getDay()]
    }`;
  }
};
