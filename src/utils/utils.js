import axios from 'axios'

    export function getGeolocation(city) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyDf479QrOwdpF27p-e5GMIpBF68I2TENmo`);
    }

    export function getForecast(lat,lon) {
        return axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=2abccc37894bfee455ecf31758b176eb`);
    }