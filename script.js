const apiKey = "66383aa31c8cd87507a634d684f7b2bf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-status img")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);


    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather [0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather [0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather [0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather [0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    if(data.weather [0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
   
}

searchButton.addEventListener("click", () =>{
    checkWeather(searchBox.value);
})

checkWeather()