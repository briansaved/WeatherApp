let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let forecast = (data) => {
  // console.log("forecast funct is called :", data);
  let displayContent = "";
  //displays through length of whole object iteration regardless of varying length
  //currently weatherbit api gives 16 days forcast but if it changes, code will work
  //thus data.weather.length-1
  for (let i = 0; i < data.weather.length - 1; i++) {
    let d = new Date();
    d.setDate(d.getDate() + i);
    let dayForecast = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${
      weekDay[d.getDay()]
    }`;
    const weather = data.weather[i].weather.description;
    const icon = data.weather[i].weather.icon;
    const max = data.weather[i].max_temp;
    const min = data.weather[i].min_temp;

    displayContent = `${displayContent}  
    <h5>${dayForecast}</h5>      
    <div class="weather">
        <h6>${weather}</h6>
        <img src="src/client/media/icons/${icon}.png" widht="50px" height="50px">
        <div class="multi-line">
            <p>Max Temp: ${max} &#8451;</p>
            <p>Min Temp: ${min} &#8451;</p>
        </div>
    </div> 
    <hr>       
    `;
  }
  console.log(displayContent);
  return displayContent;
};

export { forecast };
