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
      <button @click="getForecast">Buscar</button>
    </div>
  </div>
</template>

<script>
import { Storage } from "../localStorage";
import { INFOS_CITY } from "../localStorage/storageKeys";
import { getForecast, kelvinInCelsius } from "../utils/utils";
export default {
  data() {
    return {
      coordinates: { lat: "", lng: "" },
    };
  },

  methods: {
    async getForecast() {
      getForecast(
        Number(this.coordinates.lat),
        Number(this.coordinates.lng)
      ).then(async (response) => {
        this.$store.commit("updateInfos", {
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
      this.$router.push(`/forecast/${this.city}`);
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
