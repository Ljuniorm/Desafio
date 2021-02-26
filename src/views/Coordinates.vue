<template>
  <div class="container">
    <div class="cardCoordinates">
      <img img src="../assets/logo.png" />
      <h2>Insira suas Coordenadas</h2>
      <form>
        <input v-model="coordinates.lat" type="number" placeholder="Latitude" />
        <input
          v-model="coordinates.lng"
          type="number"
          placeholder="Longitude"
        />
      </form>
      <b v-if="alert"
        ><i class="fas fa-exclamation-triangle alert"></i>Coordenadas
        Inválidas</b
      >
      <button @click="getGeolocationReverse">Buscar</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Storage } from "../localStorage";
import { INFOS_CITY, HISTORIC } from "../localStorage/storageKeys";
import { UPDATE_INFO } from "../store/mutationTypes";
import {
  getForecast,
  getGeolocationReverse,
  kelvinInCelsius,
} from "../utils/utils";
export default {
  data() {
    return {
      coordinates: { lat: "", lng: "" },
      historicSearch: [],
      cityName: "",
      alert: false,
    };
  },

  created() {
    this.getHistoric();
  },

  methods: {
    ...mapMutations({ UPDATE_INFO }),

    async getGeolocationReverse() {
      await getGeolocationReverse(
        Number(this.coordinates.lat),
        Number(this.coordinates.lng)
      ).then(async (response) => {
        if (response.data.results.length)
          this.cityName = response.data.results[0].formatted_address;
      });
      if (!this.cityName) return (this.alert = true);
      this.historicSearch.push({
        name: this.cityName,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng,
        city: this.cityName,
      });
      await Storage.setItem(HISTORIC, this.historicSearch);
      this.getForecast();
    },

    async getForecast() {
      getForecast(
        Number(this.coordinates.lat),
        Number(this.coordinates.lng)
      ).then(async (response) => {
        this.UPDATE_INFO({
          forecast: response.data,
          celsius: kelvinInCelsius(response.data.current.temp),
          days: response.data.daily.map((day) => {
            return {
              ...day,
              date: this.unixToDate(day.dt),
            };
          }),
          alerts: response.data.alerts,
          current: response.data.current,
        });

        await Storage.setItem(INFOS_CITY, {
          forecast: response.data,
          celsius: kelvinInCelsius(response.data.current.temp),
          days: response.data.daily.map((day) => {
            return {
              ...day,
              date: this.unixToDate(day.dt),
            };
          }),
          alerts: response.data.alerts,
          current: response.data.current,
        });
      });
      this.$router.push(`/forecast/${this.cityName}`);
    },

    async getHistoric() {
      this.historicSearch = await Storage.getItem(HISTORIC);
      console.log(
        "🚀 ~ file: Coordinates.vue ~ line 99 ~ getHistoric ~ this.historicSearch",
        this.historicSearch
      );
    },

    unixToDate(unix) {
      const date = new Date(unix * 1000);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    },
  },
};
</script>

<style scoped>
@media (max-width: 780px) {
  .cardCoordinates {
    width: 100% !important;
  }
}

.cardCoordinates {
  background-color: white;
  height: 500px;
  width: 500px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 40px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #004983;
  outline: none;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
}

button:hover {
  background: #002b4d;
}

input {
  border: 3px solid #00b4cc;
  padding: 5px;
  height: 20px;
  width: 250px;
  margin-bottom: 150px;
  border-radius: 5px;
  outline: none;
  color: #00b4cc;
}

h2 {
  color: #00b4cc;
  margin-bottom: 30px;
  margin-top: 20px;
}

b {
  color: red;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  margin: 15px 0px;
}

img {
  height: 70px;
}
</style>
