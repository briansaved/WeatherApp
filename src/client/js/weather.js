let getWeather = async (lat, lon) => {
  let baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
  let api_Key = "282a4aa501c44280a3e375ecd05f4007";
  let options = `?lat=${lat}&lon=${lon}&key=`;

  console.log(`lat is ${lat}and long is ${lon}`);
  console.log(baseUrl + options + api_Key);
  const response = await fetch(baseUrl + options + api_Key);

  try {
    const forcast = await response.json();
    console.log(forcast);
    return forcast; //a default of a 16 day forcast
  } catch (err) {
    console.log(`OOPSIE : ${err}`);
  }
};

export { getWeather };
