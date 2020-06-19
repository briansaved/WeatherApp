let days = (date) => {
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  let day = String(d.getDate()).padStart(2, "0"); //Creating two digit date format
  let month = String(d.getMonth() + 1).padStart(2, "0"); //Month is 0 based
  let year = d.getFullYear();

  d = `${year}/${month}/${day}`;

  //   console.log(`dep date is ${date} and today is ${d}`);
  //   console.log(`the parsed date is ${Date.parse(d)}`);

  let daysRemain = Math.ceil((Date.parse(date) - Date.parse(d)) / 86400000); //1000ms*60sec*60min*24hours
  //   console.log(`remaining days are ${daysRemain}`);
  return daysRemain <= 0 ? alert("Trip must start from Tomorrow") : daysRemain;
};

export { days };
