// console.log(hours);
// console.log(minutes);
// console.log(seconds);

function time1() {
    let time = new Date();
    return document.getElementById("time").innerHTML = time.toLocaleTimeString();
}

 const apikey = "5358f9697e155303495dcea52d4c1ffc";
    const image = document.getElementById("icon");
    const info = document.getElementById("info");


    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            // Pass geolocation data to getWeatherData function
            
            getWeatherData(latitude, longitude, apikey, image, info);
        }, function (error) {
            console.error("Error retrieving location:", error);
            alert("Unable to retrieve your location.");
        });
    }


setInterval(time1, 1000);

async function checkWeather() {
    let city = document.getElementById("nameofcity").value.toLowerCase();
    const apikey = "5358f9697e155303495dcea52d4c1ffc";
    const image = document.getElementById("icon");
    const info = document.getElementById("info");

    // If the city name is empty, use geolocation to get weather
    if (city == "") {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log("Latitude: " + latitude + ", Longitude: " + longitude);
                // Pass geolocation data to getWeatherData function

                getWeatherData(latitude, longitude, apikey, image, info);
            }, function (error) {
                console.error("Error retrieving location:", error);
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        return;
    }

    // Otherwise, fetch weather data based on the city name
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.message == "city not found") {
            alert("City Not Found \nplease check the spelling or \ntry different city");
            return;
        }

        displayWeatherData(data, image, info);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather data.");
    }
}

function getWeatherData(latitude, longitude, apikey, image, info) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data, image, info);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the weather data.");
        });
}

function displayWeatherData(data, image, info) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

    if (data.weather[0].main == 'Clear') {
        image.src = "images/sunny.png";
        info.innerHTML = data.weather[0].main;
    } else if (data.weather[0].main == 'Clouds') {
        image.src = "images/cloud.png";
        info.innerHTML = data.weather[0].main;
    } else if (data.weather[0].main == 'Rain') {
        image.src = "images/rainny.png";
        info.innerHTML = data.weather[0].main;
    } else if (data.weather[0].main == 'Drizzle') {
        image.src = "images/drizzle.png";
        info.innerHTML = data.weather[0].main;
    } else if (data.weather[0].main == 'Mist') {
        image.src = "images/mist.png";
        info.innerHTML = data.weather[0].main;
    } else {
        image.src = "images/cloud-p.png";
        info.innerHTML = data.weather[0].main;
    }
}
