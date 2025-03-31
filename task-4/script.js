import config from "./config.js";

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const weatherTemperature = document.getElementById("weather-temperature");
const weatherCity = document.getElementById("weather-city");
const humidityPercentage = document.getElementById("humidity-percentage");
const windSpeed = document.getElementById("wind-speed");

searchBar.value = "";
searchButton.addEventListener("click", updateWeather);

async function updateWeather() {
  if (searchBar.value.trim() === "") {
    alert("Enter a city name!");
  } else {
    let locationDetails = await getLocationDetails(searchBar.value.trim());
    if (!locationDetails[0]) {
      alert("Invalid city name!");
      throw new Error("Invalid city name");
    }
    let cityName = locationDetails[0].name;
    let weatherDetails = await getWeatherDetails(
      locationDetails[0].lat,
      locationDetails[0].lon
    );
    weatherCity.innerHTML = cityName;
    let temperature = weatherDetails.main.temp;
    weatherTemperature.innerText = temperature + "°c";
    let humidity = weatherDetails.main.humidity;
    humidityPercentage.innerHTML = humidity + "%";
    let wind = weatherDetails.wind.speed * 3.6;
    windSpeed.innerText = wind.toFixed(2) + " km/h";
    searchBar.value = "";
  }
}

async function getLocationDetails(cityName) {
  let endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${config.API_KEY}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      alert("Error fetching the data");
      throw new Error(`Response status ${response.statusText}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

async function getWeatherDetails(latitude, longitude) {
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.API_KEY}&units=metric`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      alert("Error fetching the data");
      throw new Error(`Response status ${response.statusText}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
