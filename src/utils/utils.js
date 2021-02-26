import axios from 'axios'

    export function getGeolocation(city) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyDf479QrOwdpF27p-e5GMIpBF68I2TENmo`);
    }

    export function getGeolocationReverse(lat,lon) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyDf479QrOwdpF27p-e5GMIpBF68I2TENmo`);
    }

    export function getForecast(lat,lon) {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f43aec1ea7b3723041005d7a2d9b2029`);
    }

    export function kelvinInCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }
