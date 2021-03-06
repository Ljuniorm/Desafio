<template>
  <div class="appBar">
    <img img src="../../assets/logo.png" alt="" />
    <div class="search">
      <input
        v-model="city"
        type="text"
        class="searchInput"
        list="datalistOptions"
        placeholder="Busque por uma cidade..."
        @keypress.enter="searchCity"
      />

      <datalist id="datalistOptions">
        <option v-for="(item, i) in historicSearch" :key="i">
          {{ item.name }}
        </option>
      </datalist>

      <button @click="searchCity" type="submit" class="searchButton">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div>
      <button
        v-if="$route.name === 'Forecast'"
        class="buttonLogout"
        @click="back"
      >
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {
  getForecast,
  getGeolocation,
  kelvinInCelsius,
} from "../../utils/utils";
import { Storage } from "../../localStorage";
import { INFOS_CITY, HISTORIC } from "../../localStorage/storageKeys";
import { mapMutations } from "vuex";
import { UPDATE_INFO } from "../../store/mutationTypes";

export default {
  data() {
    return {
      city: "",
      coordinates: null,
      geolocation: null,
      historicSearch: [],
    };
  },

  created() {
    this.getHistoric();
  },

  methods: {
    ...mapMutations({ UPDATE_INFO }),

    async searchCity() {
      if (this.$route.params.city === this.city) return;
      for (let i = 0; i < this.historicSearch.length; i++) {
        if (this.historicSearch[i].name === this.city) {
          this.coordinates = {
            lat: this.historicSearch[i].lat,
            lng: this.historicSearch[i].lng,
          };
          return this.getForecast();
        }
      }
      await getGeolocation(this.city).then(async (response) => {
        this.coordinates = response.data.results[0].geometry.location;
        this.geolocation = response.data;
      });
      this.historicSearch.push({
        name: this.city,
        lat: this.coordinates.lat,
        lng: this.coordinates.lng,
        city: this.geolocation.results[0].formatted_address,
      });
      await Storage.setItem(HISTORIC, this.historicSearch);
      this.getForecast();
    },

    async getForecast() {
      getForecast(this.coordinates.lat, this.coordinates.lng).then(
        async (response) => {
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
        }
      );
      this.$router.push(`/forecast/${this.city}`);
      this.city = "";
    },

    async getHistoric() {
      const historic = await Storage.getItem(HISTORIC);
      if (historic) this.historicSearch = historic;
    },

    unixToDate(unix) {
      const date = new Date(unix * 1000);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      };
    },

    back() {
      this.$router.push({ name: "Coordinates" });
    },
  },
};
</script>

<style scoped>
.appBar {
  background-color: #c4dfe6;
  height: 90px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  margin: 0px 30px;
}

body {
  background: #f2f2f2;
  font-family: "Open Sans", sans-serif;
}

.searchInput {
  width: 100%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 20px;
  width: 300px;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.searchInput:focus {
  color: #00b4cc;
}

.buttonLogout {
  margin-right: 60px;
  width: 40px;
  height: 36px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #004983;
  outline: none;
  cursor: pointer;
}

.buttonLogout:hover {
  background: #002b4d;
}

.search {
  display: flex;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  margin-right: 30px;
  outline: none;
}

@media (max-width: 780px) {
  .appBar {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttonLogout {
    margin-right: 0px;
  }

  .searchInput {
    width: 200px;
  }

  img {
    display: none;
  }
}
</style>