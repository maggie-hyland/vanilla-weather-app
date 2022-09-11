let apiKey = "f43e87505c78f4b7859080149fe4a760";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//the following function displays the temperature, city, weather description, humidity, and wind speed
function displayTemperature(response) {
  //the following console.log helps for obtaining the source for the info from the weather API
  console.log(response.data);

  //this will find the temp from the weather API and integrate it into the app
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  //this will find the city from the weather API and integrate it into the app
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  //this will find the weather description from the weather API and integrate it into the app
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  //this will find the humidity from the weather API and integrate it into the app
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  //this will find the wind speed from the weather API and integrate it into the app
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
