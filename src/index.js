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

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.getElementById("icon").src =
    "https://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
}

function searchNewCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchNewCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function locationBarcelona(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function locationBerlin(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function locationNewYork(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function locationParis(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function locationPrague(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Prague&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
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
