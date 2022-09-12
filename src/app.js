function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

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

  //this will take the data from the formatDate function (which is milliseconds from 1970 *thats just how its calculated in JS*) and integrate it into the app
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  //this will find the icon description listed within the data from the weather API and match it with its image that can be found at the listed URL
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //this will set the alt for the icon to the description given (ie. cloudy, light rain, sunny...)
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f43e87505c78f4b7859080149fe4a760";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Tokyo");
