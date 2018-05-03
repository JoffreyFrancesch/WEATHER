//var x = document.getElementById('show');
//var ville = document.getElementById("inputVille")
var img = document.getElementById('weather_image');
var ville = document.getElementById('ville');
var description = document.getElementById('description');
var inputVilleValue = document.getElementById('inputVille');
var min = document.getElementById('min');
var max = document.getElementById('max');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var pressure = document.getElementById('pressure')


var api = 'http://api.openweathermap.org/data/2.5/weather?'
var lat = 0;
var lon = 0;
var keyapi = 'APPID=b5fe018318b91102e114c2e5db8138d8'
var units = 'units=metric'
var lang = 'lang=fr'
var url = null;

function getVille() {
    var url = api + "q=" + inputVilleValue.value + '&' + units + '&' + lang + '&' + keyapi;
    $.getJSON(url, function (data) {
        writeData(data);
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Not supported in yours browser");
    }
}

function showPosition(position) {
    var lat = 'lat=' + position.coords.latitude;
    var lon = 'lon=' + position.coords.longitude;
    var url = api + lat + '&' + lon + '&' + units + '&' + lang + '&' + keyapi;
    $.getJSON(url, function (data) {
        writeData(data);
    })
}


function imageCard(id) {
    if (id >= 200 && id < 300) {
        //thunderstorm
        img.src = "temps_image/thunderstrom.png"
    } else if (id >= 300 && id < 400) {
        //drizzle
        img.src = "temps_image/drizzle.png"
    } else if (id >= 500 && id < 600) {
        //rain
        img.src = "temps_image/drizzle.png"
    } else if (id >= 600 && id < 700) {
        //snow
        img.src = "temps_image/snow-cloud.png"
    } else if (id >= 700 && id < 800) {
        //atmosphere
        img.src = "temps_image/cloud.png"
    } else if (id == 800) {
        //clear
        img.src = "temps_image/sunny.png"
    } else if (id > 800) {
        //clouds
        img.src = "temps_image/cloud_sunny.png"
    } else {
        console.log('picture not match');
    }
}

function writeData(data) {
    ville.innerHTML = data.name + " -- " + data.sys.country
    description.innerHTML = (data.weather[0].description).toUpperCase() + "<br>" + data.main.temp + " °C"
    imageCard(data.weather[0].id);
    min.innerHTML = "Min : "+ data.main.temp_min + " °C";
    max.innerHTML = "Max : "+data.main.temp_max + " °C";
    humidity.innerHTML = "Hum : " + data.main.humidity + "%"
    pressure.innerHTML = "Pres : " + data.main.pressure + " hPa"
    wind.innerHTML = "Vent : " + data.wind.speed + "m.s-1 | " + data.wind.deg + " " + degToCard(data.wind.deg)
}

function degToCard(deg) {
    if (deg > 11.25 && deg < 33.75) {
        return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
        return "E";
    } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
        return "S";
    } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
        return "W";
    } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
}