const apiKey = "bbc2b5e33bc93b1c9b2424b433881299"

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getCityForecast (cityName) {
    
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    .then( (data) => data.json())
    .then(function(data){
        console.log(data);
        console.log(data.main.humidity)
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


            // populate 5 days section

        });

}

document.getElementById('search-form').addEventListener("submit", search);
