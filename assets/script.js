
const apiKey = "bdeb733f8c83fe30d7a7256cbee4cb4a";

//Setting the values for the search bar
let search = $("#searchButton");
let searchBar = $("#inlineFormInputName2");
search.on("click", getWeather);

//Weather Variables
let currentDate = $("#date");
let tempVal = $("#temp");
let wind = $("#wind");
let humidity = $("#humidity");
let conditions = $("#conditions");
let icon = $("#weatherIcon");
let nameOfCity = $("#nameOfCity");
let weatherIcon = $("#weatherIcon");

//Forecast card variable
let forecastCard = $(".cardF");

//First day
let date1 = $("#date-1");
let icon1 = $("#icon-1");
let max1 = $("#max-1");
let min1 = $("#min-1");
let wind1 = $("#wind-1");
let humidity1 = $("#humidity-1");

//Second day
let date2 = $("#date-2");
let icon2 = $("#icon-2");
let max2 = $("#max-2");
let min2 = $("#min-2");
let wind2 = $("#wind-2");
let humidity2 = $("#humidity-2");

//Third day
let date3 = $("#date-3");
let icon3 = $("#icon-3");
let max3 = $("#max-3");
let min3 = $("#min-3");
let wind3 = $("#wind-3");
let humidity3 = $("#humidity-3");

//Fourth Day
let date4 = $("#date-4");
let icon4 = $("#icon-4");
let max4 = $("#max-4");
let min4 = $("#min-4");
let wind4 = $("#wind-4");
let humidity4 = $("#humidity-4");

//Fifth Day
let date5 = $("#date-5");
let icon5 = $("#icon-5");
let max5 = $("#max-5");
let min5 = $("#min-5");
let wind5 = $("#wind-5");
let humidity5 = $("#humidity-5");

//History
let history = $("#history");
let historyVar = 0;

$(document).on("click", ".historyLi", function () {
    searchBar.val($(this).text());
    getWeather(event);
});

//Function to set the history values
setHist();
function setHist() {
    Object.keys(localStorage).forEach(function (key) {
        history.append(`<li class="historyLi list-group-item">${localStorage.getItem(key)}</li>`);

    });
}

//Function to retreive the weather data and assign the respective data to variables
function getWeather(event) {
    event.preventDefault();
    let citySearchVal = searchBar.val();

    //Updating history
    if (historyVar < 6) {
        historyVar = historyVar + 1;
        localStorage.setItem("history" + historyVar, citySearchVal);
        history.append(`<li class="historyLi list-group-item">${localStorage.getItem("history" + historyVar)}</li>`)

    } else {
        historyVar = 0;
        localStorage.setItem("history" + historyVar, citySearchVal);
        history.append(`<li class="historyLi list-group-item">${localStorage.getItem("history" + historyVar)}</li>`)
    }
    
        let currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchVal + "&appid=a12ab13e9d9b3fabbc403be52164096a&units=Imperial";

        //Retrieving the date data
        let objectDate = new Date();
        let day = objectDate.getDate();
        let month = objectDate.getMonth();
        let year = objectDate.getFullYear();
        let hour = objectDate.getHours();
        let minute = objectDate.getMinutes();

        let getWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchVal + "&appid=a12ab13e9d9b3fabbc403be52164096a&units=Imperial";
        fetch(currentWeather)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(" API Failure ");
                    return Promise.reject(response);
                }
            })
            .then(data => {
                nameOfCity.append(citySearchVal);
                currentDate.append(month + "-" + day + "-" + year + " " + hour + ":" + minute);
                tempVal.append("Temperature: " + data.main.temp + " °F ");
                weatherIcon.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`)
                conditions.append("Conditions: " + data.weather[0].description);
                wind.append("Wind Speed: " + data.wind.speed + " mph");
                humidity.append("Humidity: " + data.main.humidity + "%");
            })
        fetch(getWeather)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then(data => {
                date1.append(data.list[7].dt_txt);
                icon1.append(`<img src="https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png"/>`)
                max1.append("Temperature: " + data.list[7].main.temp + " °F");
                wind1.append("Wind Speed: " + data.list[7].wind.speed + " mph");
                humidity1.append("Humidity: " + data.list[7].main.humidity + " %");

                date2.append(data.list[15].dt_txt);
                icon2.append(`<img src="https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png"/>`);
                max2.append("Temperature: " + data.list[15].main.temp + " °F");
                wind2.append("Wind Speed: " + data.list[15].wind.speed + " mph");
                humidity2.append("Humidity: " + data.list[15].main.humidity + " %");

                date3.append(data.list[23].dt_txt);
                icon3.append(`<img src="https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png"/>`);
                max3.append("Temperature: " + data.list[23].main.temp + " °F");
                wind3.append("Wind Speed: " + data.list[23].wind.speed + " mph");
                humidity3.append("Humidity: " + data.list[23].main.humidity + " %");

                date4.append(data.list[31].dt_txt);
                icon4.append(`<img src="https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png"/>`);
                max4.append("Temperature: " + data.list[31].main.temp + " °F");
                wind4.append("Wind Speed: " + data.list[31].wind.speed + " mph");
                humidity4.append("Humidity: " + data.list[31].main.humidity + " %");

                date5.append(data.list[39].dt_txt);
                icon5.append(`<img src="https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png"/>`);
                max5.append("Temperature: " + data.list[39].main.temp + " °F");
                wind5.append("Wind Speed: " + data.list[39].wind.speed + " mph");
                humidity5.append("Humidity: " + data.list[39].main.humidity + " %");
            })
            .catch(error => 
                console.log(error));
    }