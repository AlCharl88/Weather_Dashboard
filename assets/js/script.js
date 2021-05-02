var inputCity = document.querySelector("#input-city");
var clickButton = document.querySelector(".btn btn-primary");
var storeCity = document.querySelector("#storecityinput");
var textTwo = document.querySelector(".text2");
var cityName = document.querySelector("#cityname");
var currentBox = document.querySelector("#current-box");
var textThree = document.querySelector("#five-d-forecast");
var fiveDayForec =  document.querySelector("#dayone-to-dayfive");

var cities = [];

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = inputCity.value.trim();

    if (!city) {
        prompt("enter a valide City name");
    } else {
        getCurentWeather(city);
        getFiveDayWeather(city);
        cities.unshift({city});
        inputCity.value = "";
    }

    saveSearch();
    pastSearch(city);
}

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCurentWeather = function(city) {
    var apiKey = "a0e8262b300cc54d377123a7cd135bc9"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


    fetch(apiURL)
    .then(function(response) {
    response.json().then(function(data) {
        displayWeather(data, city);
    });
});

};

var displayWeather = function(weather, searchCity) {
    currentBox.textContent = "";
    cityName.textContent = searchCity;

    // console.log(weather) 

    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    cityName.appendChild(currentDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    cityName.appendChild(weatherIcon);

    
    //create a span element to hold temperature data
   var currentTemp = document.createElement("span");
   currentTemp.textContent = "Temperature: " + weather.main.temp + " °F";
   currentTemp.classList = "row-list-item"
  
   //create a span element to hold Humidity data
   var currentHumd = document.createElement("span");
   currentHumd.textContent = "Humidity: " + weather.main.humidity + " %";
   currentHumd.classList = "row-list-item"

   //create a span element to hold Wind data
   var currentWind = document.createElement("span");
   currentWind.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   currentWind.classList = "row-list-item"

   //append to container
   currentBox.appendChild(currentTemp);

   //append to container
   currentBox.appendChild(currentHumd);

   //append to container
   currentBox.appendChild(currentWind);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUVIndex(lat,lon)
}

    var getUVIndex = function(lat,lon) {
        var apiKey = "a0e8262b300cc54d377123a7cd135bc9"
        var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    
        fetch(apiURL)
        .then(function(response) {
            response.json().then(function(data) {
                getUVIndex(lat,lon);
            });
        });
    }

    var displayUVIndex = function(index) {
        var uvIndexEl = document.createElement('div');
        uvIndexEl.textContent = "UV Index:";
        uvIndexEl.classList = "row-list-item";

        uvIndexValue = document.createElement("span");
        uvIndexValue.textContent = inde.value;
        if(index.value <=2) {
            uvIndexValue.classList = "favorable";
        } else if(index.value > 2 && index.value<=8) {
            uvIndexValue.classList = "moderate";
        } else {
            uvIndexValue.classList = "severe";
        }

        uvIndexEl.appendChild(uvIndexValue);

        currentBox.appendChild(uvIndexEl);
    }

    var getfiveDay = function(city) {
        var apiKey = "a0e8262b300cc54d377123a7cd135bc9"
        var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

        fetch(apiURL)
        .then(function(response) {
            response.json().then(function(data) {
                displayFiveDay();
            });
        });
    };

    var displayFiveday = function(weather) {
        fiveDayForec.textContent = "";
        textThree.textContent = "5-Day Forecast:";

        var forecast = weather.list;
        for (i=0; i < forecast.length; i++) {
            var dailyForecast = forecast[i];

            var forecastEl = document.createElement("div");
            forecastEl.classList = "card bg-primary textilight m-2";

            var forecastDate = document.createElement("h3");
            forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM Do, YYYY");
            ForecastDate.classList = "card-header text-center"
            forecastEl.appendChild(forecastDate);

            var weatherIcon = document.createElement("img")
            weatherIcon.classList = "card-body text-center";
            weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

            forecastEl.appendChild(weatherIcon);

            var forecastTempEl = document.createElement("span");
            forecastTempEl.classList = "card-body text-center";
            forecastTempEl.textContent = dailyForecast.main.temp + " °F";

            forecastEl.appendChild(forecastTempEl);

            var forecastHumEl = document.createElement("span");
            forecastHumEl.classList = "card-body text-center";
            forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

            forecastEl.appendChild(forecastHumEl);

            fiveDayForec.appendChild(forecastEl);
        }
    }

    var pastSearch = function(pastSearch){
 
        pastSearchEl = document.createElement("button");
        pastSearchEl.textContent = pastSearch;
        pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
        pastSearchEl.setAttribute("data-city",pastSearch)
        pastSearchEl.setAttribute("type", "submit");
    
        storeCity.prepend(pastSearchEl);
    }

    var pastSearchHandler = function(event){
        var city = event.target.getAttribute("data-city")
        if(city){
            getCurentWeather(city);
            getFiveDay(city);
        }
    }

    inputCity.addEventListener("submit", formSubmitHandler);
    storeCity.addEventListener("click", pastSearchHandler);

    console.log("clicked");