//var x = document.getElementById('show');
//var ville = document.getElementById("inputVille")
var img = document.getElementById('weather_image');
var ville = document.getElementById('ville');
var description = document.getElementById('description');
var inputVilleValue = document.getElementById('inputVille');

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
}