/* Global Variables */
let departureValue;

//MAKES async fetch request to openweather api
const retrieveData = async (url = "") => {
  const request = await fetch(url);
  try {
    let cityData = await request.json();
    //Validate that the City Entered is Valid
    cityData.geonames.length == 0 //Validate City Name
      ? (alert("Please Enter a valid Location"), listener())
      : console.log(`${cityData.geonames[0].countryName}
      ${cityData.geonames[0].lat}
      ${cityData.geonames[0].lng}
      ${cityData.geonames[0].name}`);
    return cityData;
  } catch (error) {
    console.log("Retrieve Data Error App.js: ", error);
  }
};

let listener = () => {
  document.getElementById("generate").addEventListener("click", sendRequest);
};

listener();
//offcial request sent on click of generate buttons
function sendRequest() {
  //disable the event listener whilst data is being retrieved
  Client.unlisten();
  const newCity = document.getElementById("zip").value;
  let departure = document.getElementById("tripDate").value; //only eval after click
  departureValue = departure; //Set Global Variable for days to go

  const apiKey = `briansaved`;
  const baseUrl = `http://api.geonames.org/searchJSON?q=`;
  let options = `&maxRows=10&username=`; //max of 10 result in the Array
  //format is http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo

  newCity == "" || departure == ""
    ? (alert(`Please fill in all fields!`), listener()) //reinstate lister
    : retrieveData(baseUrl + newCity + options + apiKey)
        .then(async function (data) {
          await postData("/data", {
            country: data.geonames[0].countryName,
            lat: data.geonames[0].lat,
            long: data.geonames[0].lng,
            city: data.geonames[0].name,
            dep: departure,
          });
          let finalWeather = await Client.getWeather(
            data.geonames[0].lat,
            data.geonames[0].lng
          );
          return finalWeather;
        })
        .then(async function (weather) {
          await postData("/more", {
            weather: weather.data, //only posting the array with forecast
          });
          updateUi();
        });
}

let postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    let newData = await response.json();

    return newData;
  } catch (error) {
    console.log(`Post Data Error App.js: ${error}`);
  }
};

let updateUi = async () => {
  let daysValue = Client.days(departureValue);

  const request = await fetch("/all");
  try {
    let allData = await request.json();
    let cityImage = await Client.getImage(allData.city, allData.country);
    let img = document.createElement("img");
    img.setAttribute("src", cityImage);
    img.setAttribute("width", "100%");
    let cityPhoto = document.getElementById("cityImage");
    cityPhoto.firstChild //Fixed bug where pictures kept getting added
      ? cityPhoto.removeChild(cityPhoto.firstChild) //Removed last picture if there is one
      : console.log("No Picture!");
    cityPhoto.appendChild(img); //Keeps UI clean with one pic only

    document.getElementById("city").innerHTML =
      "Enjoy Your Visit to   " + allData.city;
    document.getElementById("days").innerHTML =
      "There are Less Than " + daysValue + " Days Till you leave";

    //If Departure date is more than 16 days away, 16th day temp is displayed
    document.getElementById("temp").innerHTML =
      allData.weather[`${daysValue > 15 ? 15 : daysValue}`].temp +
      ` ${
        daysValue > 15
          ? "Degrees Celcius in 16 Days Time" //Conditional Message Rendering if more than 16
          : "Degrees Celcius on Arrival" //If less than 16 days ahead
      }`;
    document.getElementById("rest").innerHTML = Client.forecast(allData);
    listener(); //reinstate listener once data is displayed
  } catch (error) {
    console.log(`UI Failure Render Error APP.JS: ${error}`);
  }
};
document.getElementById("print").addEventListener("click", (e) => {
  window.print();
});
export { sendRequest };
