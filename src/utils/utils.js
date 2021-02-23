import axios from 'axios'

export function getGeolocation(key) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${key}`);
  }