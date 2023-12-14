async function makeRequestFetch(method, url) {
    let response = await fetch(url, {method: method});
    let data = await response.json();
    if (response.ok) { 
      return data
    } else {
      return []
    }
  }
  
  
function makeRequest(method, url) {
    return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
        } else {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
        }
    };
    xhr.onerror = function() {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
    };
    xhr.send();
    });
}

  
function append_data(data, id){
    let item = document.getElementById(id);
    item.innerHTML = item.innerHTML+data+"<br/>";
}

function clear_data(id) {
    let item = document.getElementById(id);
    item.innerHTML = "";
}

async function get_coords(city_name, token) {
    let coords_url = new URL('http://api.openweathermap.org/geo/1.0/direct');
    coords_url.searchParams.set('q', city_name);
    coords_url.searchParams.set('limit', '1');
    coords_url.searchParams.set('appid', token);
    let coords_data = await makeRequestFetch("GET", coords_url);
    return {'lat': coords_data[0].lat, 'lon': coords_data[0].lon}
}

async function get_current_weather(coords, token) {
    let weather_url = new URL('https://api.openweathermap.org/data/2.5/weather');
    weather_url.searchParams.set('lat', coords.lat);
    weather_url.searchParams.set('lon', coords.lon);
    weather_url.searchParams.set('appid', token);
    weather_url.searchParams.set('units', 'metric');
    let weather_data = await makeRequestFetch("GET", weather_url);
    return {
        'temp': weather_data.main.temp, 
        'feels_like': weather_data.main.feels_like, 
        'description': weather_data.weather[0].description,
        'icon': `http://openweathermap.org/img/w/${weather_data.weather[0].icon}.png`
    }
}

async function get_forecast(coords, token) {
    let forecast_url = new URL('https://api.openweathermap.org/data/2.5/forecast');
    forecast_url.searchParams.set('lat', coords.lat);
    forecast_url.searchParams.set('lon', coords.lon);
    forecast_url.searchParams.set('appid', token);
    forecast_url.searchParams.set('units', 'metric');
    forecast_url.searchParams.set('cnt', '2');
    let forecast_data = await makeRequest("GET", forecast_url);
    return {
        'temp': forecast_data.list[1].main.temp,
        'feels_like': forecast_data.list[1].main.feels_like, 
        'description': forecast_data.list[1].weather[0].description,
        'icon': `http://openweathermap.org/img/w/${forecast_data.list[1].weather[0].icon}.png`
    }
}
  
async function get_weather() {
    let token = "577b3bd2eec54e5a84a1ae825e746783"
    clear_data("current_weather_data")
    clear_data("forecast_weather_data")

    get_coords(document.getElementById("input_field").value, token).then(value => {
        let coords = value
        console.log(coords)
        get_current_weather(coords, token).then(value => {
            append_data(`temp: ${value.temp}`, 'current_weather_data');
            append_data(`feels like: ${value.feels_like}`, 'current_weather_data');
            append_data(`description: ${value.description}`, 'current_weather_data');
            document.getElementById('weather_icon').src = value.icon;
          }).catch(err => {
            alert("can't get current weather");
          });
        get_forecast(coords, token).then(value => {
            append_data(`temp: ${value.temp}`, 'forecast_weather_data');
            append_data(`feels like: ${value.feels_like}`, 'forecast_weather_data');
            append_data(`description: ${value.description}`, 'forecast_weather_data');
            document.getElementById('forecast_icon').src = value.icon;
        }).catch(err => {
            alert("can't get forecast");
        });
      }).catch(err => {
        alert("can't find such city! try another one");
      });
}

get_weather()