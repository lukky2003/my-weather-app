function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let today = document.querySelector("#current-date");
  today.innerHTML = ` ${day} ${hours}:${minutes}`;
}

formatDate();

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <img
              src="./images/icons/03d.png"
              alt="Light rain"
              class="weather-symbol-secondary"
            />
            <p class="weather-forecast-date">${day}</p>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "dfb3o94a207df9d14tcc4fa2a203a2a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.temperature.pressure
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.getElementById("icon").src =
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/" +
    response.data.condition.icon +
    ".png";

  getForecast(response.data.city);
}

function searchNewCity(city) {
  let apiKey = "dfb3o94a207df9d14tcc4fa2a203a2a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchNewCity(city);
}

function searchLocation(position) {
  let apiKey = "dfb3o94a207df9d14tcc4fa2a203a2a7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function locationBarcelona(position) {
  searchNewCity("Barcelona");
}

function locationBerlin(position) {
  searchNewCity("Berlin");
}

function locationNewYork(position) {
  searchNewCity("New York");
}

function locationParis(position) {
  searchNewCity("Paris");
}

function locationPrague(position) {
  searchNewCity("Prague");
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", currentLocation);

let weatherBarcelona = document.querySelector("#barcelona");
weatherBarcelona.addEventListener("click", locationBarcelona);

let weatherBerlin = document.querySelector("#berlin");
weatherBerlin.addEventListener("click", locationBerlin);

let weatherNewYork = document.querySelector("#new-york");
weatherNewYork.addEventListener("click", locationNewYork);

let weatherParis = document.querySelector("#paris");
weatherParis.addEventListener("click", locationParis);

let weatherPrague = document.querySelector("#prague");
weatherPrague.addEventListener("click", locationPrague);

let searchForm = document.querySelector(".input-group");
searchForm.addEventListener("submit", searchInput);

searchNewCity("Paris");
