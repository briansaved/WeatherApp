let getImage = async (city, country) => {
  const baseUrl = "https://pixabay.com/api/?key=";
  const api_Key = "16717105-735b294afc55d03fb38d00a9d&q=";
  const options = "&image_type=photo&category=places&orientation=horizontal";
  const countryOpt = country.split(" ").join("+"); //remove space in query If there is
  const cityOpt = city.split(" ").join("+"); //remove space replace with + for correct query
  //if there is a space at all, else does nothing.

  let image = await fetch(baseUrl + api_Key + cityOpt + options);
  let images = await fetch(baseUrl + api_Key + countryOpt + options);
  //Default picture of Cairo Pyramids is City and Country Pic unavailable
  let defaultPic = await fetch(baseUrl + api_Key + "egypt" + options); //Pyramids

  let returnPic; //To be accessible from Tryc Catch and Finally Block

  //The extra feature was to return the country Image if the City Image returns nothing.
  try {
    let picData = await image.json(); //request both City Image and
    let picDatas = await images.json(); //Country iMAGE
    returnPic =
      picData.total == 0 //if City is obscure and has no Image
        ? (returnPic = picDatas.hits[0].webformatURL) //Use Country Image instead
        : (returnPic = picData.hits[0].webformatURL);
  } catch (err) {
    console.log("City And Country Image Error :", err);
    let defaults = await defaultPic.json(); //In case of an error
    returnPic = defaults.hits[0].webformatURL; //Pull Pyramids default Picture
  } finally {
    return returnPic; //Return Pic, This code always runs
    //Return Pic is set in function scope so whatever condition succeeds is returned
  }
};

export { getImage };
