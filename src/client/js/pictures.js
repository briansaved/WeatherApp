let getImage = async (city, country) => {
  const baseUrl = "https://pixabay.com/api/?key=";
  const api_Key = "16717105-735b294afc55d03fb38d00a9d&q=";
  const options = "&image_type=photo&category=places&orientation=horizontal";
  /*https://pixabay.com/api/?key=16717105-735b294afc55d03fb38d00a9d
  &q=yellow+flowers&image_type=photo
  */
  console.log("country argument is ", country);
  console.log(baseUrl + api_Key + city + options);
  let image = await fetch(baseUrl + api_Key + city + options);
  let images = await fetch(baseUrl + api_Key + country + options);
  // let imageFallback;

  //The extra feature was to return the country Image if the City Image returns nothing.

  try {
    let picData = await image.json(); //request both City Image and
    let picDatas = await images.json(); //Country iMAGE
    console.log("City Image Url is ", picData.hits[0].webformatURL); //Log the urls
    console.log("Country Image Url is ", picDatas.hits[0].webformatURL);
    return picData.hits.length == 0 //if City Image does not Exist
      ? picDatas.hits[0].webformatURL //Use Country image
      : picData.hits[0].webformatURL; //But Use City Image if it Exists
  } catch (err) {
    console.log("OOPSIE :", err);
  }
};

export { getImage };
