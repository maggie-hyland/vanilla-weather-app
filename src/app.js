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

function displayTemperature(response) {
  //the following console.log helps for obtaining the source for the info from the weather API
  console.log(response.data);

  //this is just storing the value given by the weather API which will be used in the other function "convertToFahrenheit"
  celsiusTemperature = response.data.main.temp;

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

//fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  //first, open the row
  let forecastHTML = `<div class="row">`;
  //then define the days
  let days = ["Thu", "Fri", "Sat"];
  //then create a function to inject the days into the code below
  days.forEach(function (day) {
    //then let forecastHTML equal itself (the div row from above), AND all the code written below
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <div class="card">
            <h5 class="card-header weather-forecast-date">${day}</h5>
            <div class="card-body">
              <img
                src="http://openweathermap.org/img/wn/03n@2x.png"
                alt=""
              />
              <p class="card-text weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-max"
                  >22°
                </span>
                <span class="weather-forecast-temperatures-min"
                  >18°</span
                 >
              </p>
            </div>
          </div>
        </div>`;
  });
  //then close the row
  forecastHTML = forecastHTML + `</div>`;
  //then inject it into the HTML
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
