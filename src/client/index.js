import { sendRequest } from "./js/app.js";
import { unlisten } from "./js/handleSubmit";
import { days } from "./js/days";
import { getWeather } from "./js/weather";
import { getImage } from "./js/pictures";
import { forecast } from "./js/forecast";

require("regenerator-runtime/path").path; //Solve regenerator runtime error

import html from "./views/index.html";
import "./styles/styles.scss";

//export these into the Client Library to fix the code wb broke
export { sendRequest, unlisten, days, getWeather, getImage, forecast };
