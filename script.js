var x = document.getElementById('show');
var ville = document.getElementById("inputVille")

var api = 'http://api.openweathermap.org/data/2.5/weather?'
var lat = 0;
var lon = 0;
var keyapi = 'APPID=b5fe018318b91102e114c2e5db8138d8'
var units = 'units=metric'
var lang = 'lang=fr'
var url = null;
function getVille(){
    console.log(ville.value);
    var url = api + "q=" + ville.value + '&' + units + '&' + lang + '&' + keyapi;
    console.log(url);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Not supported in yours browser");
    }
}

function showPosition(position) {
    console.log("Latitude : " + position.coords.latitude);
    console.log("Longitude : " + position.coords.longitude);
    var lat = 'lat=' + position.coords.latitude;
    var lon = 'lon=' + position.coords.longitude;
    var url = api + lat + '&' + lon + '&' + units + '&' + lang + '&' + keyapi;
    console.log(url); 
    x.innerHTML = "<br>Latitude : " + position.coords.latitude + "<br> Longitude : " + position.coords.longitude;
    $.getJSON(url, function(data){
        console.log(data.name);
        x.innerHTML += "<br> Vous etes à : " + data.name + "<br>Le temps est : " + data.weather[0].description + "<br> La température est de : " + data.main.temp + " °C";

    })
}
