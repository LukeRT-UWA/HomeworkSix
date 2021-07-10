const apiKey = "bbc2b5e33bc93b1c9b2424b433881299"
var currentTime = moment().format("DD" + "/" + "MM" + "/" + "YYYY");
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getCityForecast(cityName) {

    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
        .then((data) => data.json())
        .then(function (data) {
            console.log(data);

            const lon = data.coord.lon;
            const lat = data.coord.lat;
            return getOneCall(lat, lon)
                .then((onecallData) => {
                    return {
                        originalData: data,
                        onecallData: onecallData,

                    }
                })

        })


}


function getOneCall(lat, lon) {

    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
        .then((data) => data.json())


}


function search(event) {
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
            // Date
            document.getElementById('main-date').textContent = (currentTime + " ")
            // Icon
            let iconSelect = onecallData.current.weather[0].icon
            var img = document.getElementById('main-weathericon')
            img.src = ("http://openweathermap.org/img/w/" + iconSelect + ".png")
            // UV Index
            let todayUVI = onecallData.current.uvi
            document.getElementById('main-UVI').textContent = (todayUVI)
            // Set UVI background depending on severity
            if (todayUVI < 3) {
                document.getElementById('main-UVI').classList.add("low-severity")
                document.getElementById('main-UVI').classList.remove("moderate-severity")
                document.getElementById('main-UVI').classList.remove("high-severity")
            }

            else if (todayUVI >= 3 && todayUVI < 6) {
                document.getElementById('main-UVI').classList.add("moderate-severity")
                document.getElementById('main-UVI').classList.remove("low-severity")
                document.getElementById('main-UVI').classList.remove("high-severity")
            }

            else {
                document.getElementById('main-UVI').classList.add("high-severity")
                document.getElementById('main-UVI').classList.remove("low-severity")
                document.getElementById('main-UVI').classList.remove("moderate-severity")
            }


            // populate 5 days section
            for (let index = 1; index < 6; index++) {
                const daily = onecallData.daily[index];

                // Set variables for required data from API
                console.log(daily)
                let dailyIcon = daily.weather[0].icon
                console.log(dailyIcon)
                let dailyTemp = daily.temp
                let dailyWind = daily.wind_speed
                let dailyHumidity = daily.humidity
                // Create boxes on page
                let boxContainer = document.getElementById('box-container')
                let boxDiv = document.createElement("div")
                boxDiv.setAttribute("class", "box")
                // assign IDs to boxes
                boxDiv.setAttribute("id", "box-" + index)
                // attach boxes to parent container
                boxContainer.appendChild(boxDiv)
                //create required fields in boxes + attach IDs
                let boxDate = document.createElement("h3")
                boxDiv.appendChild(boxDate)
                boxDate.setAttribute("id", "box-date-" + index)
                let boxIcon = document.createElement("img")
                boxDiv.appendChild(boxIcon)
                boxIcon.setAttribute("id", "box-icon-" + index)
                let boxList = document.createElement("ul")
                boxDiv.appendChild(boxList)
                boxList.setAttribute("id", "box-list-" + index)
                let listTemp = document.createElement("li")
                boxList.appendChild(listTemp)
                listTemp.setAttribute("id", "list-temp-" + index)
                let listWind = document.createElement("li")
                boxList.appendChild(listWind)
                listWind.setAttribute("id", "list-wind-" + index)
                let listHumidity = document.createElement("li")
                boxList.appendChild(listHumidity)
                listHumidity.setAttribute("id", "list-humidity-" + index)
                //populate IDs with API data
                document.getElementById('box-date-' + index).textContent = "filler"

            }
        });

}

document.getElementById('search-form').addEventListener("submit", search);

