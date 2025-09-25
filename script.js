const apiKey = "66383aa31c8cd87507a634d684f7b2bf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select DOM elements
const inputEl = document.getElementById("input");
const searchBtn = document.querySelector(".search button");

const cityEl = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const feelsEl = document.querySelector("#feels-like p");
const humidityEl = document.querySelector("#humidity p");
const windEl = document.querySelector("#wind p");
const precipitationEl = document.querySelector("#precipitation p");

// Function to format today's date
function formatDate() {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Display date when page loads
dateEl.textContent = formatDate();

// Fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      alert("City not found!");
      return;
    }
    const data = await response.json();
    console.log(data);

    // Update DOM
    cityEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = Math.round(data.main.temp) + "°";
    feelsEl.textContent = Math.round(data.main.feels_like) + "°";
    humidityEl.textContent = data.main.humidity + "%";
    windEl.textContent = data.wind.speed + " km/h";

    // Precipitation (rain or snow, if available)
    if (data.rain && data.rain["1h"]) {
      precipitationEl.textContent = data.rain["1h"] + " mm";
    } else if (data.snow && data.snow["1h"]) {
      precipitationEl.textContent = data.snow["1h"] + " mm";
    } else {
      precipitationEl.textContent = "0 mm";
    }

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Event listener for search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = inputEl.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});


// 🌍 Default city on page load
window.addEventListener("load", () => {
  getWeather("Berlin");
});
