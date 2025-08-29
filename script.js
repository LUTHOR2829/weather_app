// Define the API key for OpenWeatherMap
const apiKey = "be7337190309354515dcaa9f0d68a253";
// Define the base URL for the weather API with metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// Select the search input box and search button from the HTML document
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
// Select the weather icon element from the HTML document
const weathericon = document.querySelector(".weather-icon");

// Asynchronous function to check the weather for a given city
async function checkWeather(city) {
    // Fetch weather data from the API using the city name
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // Check if the response status is 404 (city not found)
    if (response.status == 404) {
        // Display the error message and hide the weather information
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // If the city is found, parse the JSON data from the response
        var data = await response.json();
        // Update the city name in the HTML
        document.querySelector(".city").innerHTML = data.name;
        // Update the temperature in the HTML (rounded to nearest integer)
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        // Update the humidity in the HTML
        document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
        // Update the wind speed in the HTML
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";
        
        // Update the weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weathericon.src = "clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "clear.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "mist.png";
        } else if (data.weather[0].main == "Snow") {
            weathericon.src = "snow.png";
        }

        // Display the weather information and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add an event listener to the search button to trigger the weather check when clicked
searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value); // Call checkWeather with the value from the search box
});