function getWeather(){

    const apiKey = `8b609345b493fb299ae26c73a05da774`;
    const city = document.getElementById('city').value;

    if(!city){
        alert("Please enter a city");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching current weather data", error);
            alert("Error fetching current weather data. Please try agian.");
        });

    fetch(forecastUrl)
        .then(response => response.json())
        // .then(data => console.log(data))
        

        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error("Error fetching hourly forecast data", error);
            alert("Error fetching hourly forecast data. Please try again");
        });
}

function displayWeather(data){

    const tempDivInfo = document.getElementById("tempDiv");
    const weatherInfoDiv = document.getElementById("weatherInfo");
    const weatherIcon = document.getElementById("weatherIcon");
    const hourlyForecastDiv = document.getElementById("hourlyForecast");

    weatherInfoDiv.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";
    tempDivInfo.innerHTML = "";

    if(data.cod === "404"){
        weatherInfoDiv.innerHTML = `<p>City not found..</p>`;
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}
            `;
        
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}


function displayHourlyForecast(hourlyData){

    const hourlyForecastDiv = document.getElementById("hourlyForecast");
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourlyItem">
                <span>${hour}:00</span>
                <img src=${iconUrl} alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){

    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.style.display = "block";
}