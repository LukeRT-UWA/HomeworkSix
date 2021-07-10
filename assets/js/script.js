const apiKey = "bbc2b5e33bc93b1c9b2424b433881299"
var currentTime = moment().format("DD" + "/" + "MM" + "/" + "YYYY");
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getCityForecast (cityName) {
    
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    .then( (data) => data.json())
    .then(function(data){
        console.log(data);
        
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        return getOneCall(lat, lon)
            .then( (onecallData) => {
                return {
                    originalData: data,
                    onecallData: onecallData,

                }
            })
        
    })
  
    
}


function getOneCall(lat, lon) {
    
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then( (data) => data.json())
    
    
}


function search(event){
    event.preventDefault();
    const userInput = document.getElementById('search-input').value;
    
    getCityForecast(userInput)
        .then((data) => {
            const original = data.originalData;
            const onecallData = data.onecallData;

            console.log(original, onecallData);

            // populate the today's weather section
            // City name
            document.getElementById('main-city').textContent = (userInput + " ")
             // Temperature
            let todayTemp = original.main.temp;
            let todayTempC = (todayTemp - 273);
            let todayTempFinal = todayTempC.toFixed(2)
            // Wind
            document.getElementById('main-temperature').textContent = ("Temp: " + todayTempFinal + "°C")
            let todayWind = original.wind.speed
            let todayWindKPH = (todayWind * 1.609344)
            let todayWindFinal = todayWindKPH.toFixed(2)
            document.getElementById('main-wind').textContent = ("Wind: " + todayWindFinal + " Km/H")
            // Humidity
            let todayHumidity = original.main.humidity
            document.getElementById('main-humidity').textContent = ("Humidity: " + todayHumidity + " %")
            console.log(todayHumidity)
            // UV Index
            let todayUVI = onecallData.current.uvi
            document.getElementById('main-UVI').classList.remove("hide")
            document.getElementById('main-UVI').textContent = (todayUVI)
            // Date
            document.getElementById('main-date').textContent = (currentTime + " ")
            // Icon
            let iconSelect = onecallData.current.weather[0].icon
            var img = document.getElementById('main-weathericon')
            img.src = ("http://openweathermap.org/img/w/" + iconSelect + ".png")
            // populate 5 days section

        });

}

document.getElementById('search-form').addEventListener("submit", search);

// http://openweathermap.org/img/w/