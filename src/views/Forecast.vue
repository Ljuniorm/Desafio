<template>
  <div v-if="forecast" class="container">
    <div v-for="(item, index) in alerts" :key="index" class="lineAlert">
      <i class="fas fa-exclamation-triangle alert"></i>
      {{ item.description }}
    </div>

    <div v-if="forecast && current" class="card">
      <h3 class="title">
        Previsão de {{ dayToShow }} de {{ months[month] }} de {{ year }}
        {{
          geolocation && geolocation.results
            ? geolocation.results[0].formatted_address.split(",")[0]
            : ""
        }}
        <i class="fas fa-map-marker-alt"></i>
      </h3>
      <div class="contentCurrent">
        <img
          v-if="current.weather[0].main === 'Clear'"
          img
          src="../assets/clear.png"
          class="mainImg"
        />
        <img
          v-if="current.weather[0].main === 'Rain'"
          img
          src="../assets/rain.png"
          class="mainImg"
        />
        <img
          v-if="current.weather[0].main === 'Thunderstorm'"
          img
          src="../assets/thunder.png"
          class="mainImg"
        />
        <img
          v-if="current.weather[0].main === 'Clouds'"
          img
          src="../assets/cloud.png"
          class="mainImg"
        />
        <img
          v-if="current.weather[0].main === 'Snow'"
          img
          src="../assets/nevando.png"
          class="mainImg"
        />
        <h1 v-if="!celsius.max">{{ celsius }}</h1>
        <p v-if="!celsius.max">°C</p>
        <h1 class="maxTemp" v-if="celsius.max">
          <i class="fas fa-long-arrow-alt-up"></i> {{ celsius.max }}
        </h1>
        <p class="maxTemp" v-if="celsius.max">°C</p>
        <h1 class="minTemp" v-if="celsius.min">
          <i class="fas fa-long-arrow-alt-down"></i>{{ celsius.min }}
        </h1>
        <p class="minTemp" v-if="celsius.min">°C</p>
      </div>
      <Lines
        v-if="current.rain"
        icon="fas fa-cloud-rain"
        title="Chuva"
        :value="current.rain['1h'] ? current.rain['1h'] : current.rain"
        sufix="%"
      />
      <Lines
        icon="fas fa-tint"
        title="Umidade"
        :value="current.humidity"
        sufix="%"
      />
      <Lines
        icon="fas fa-wind"
        title="Vento"
        :value="current.wind_speed"
        sufix="km/h"
      />
      <Lines
        icon="fas fa-cloud"
        title="Nuvem"
        :value="current.clouds"
        sufix="%"
      />
      <div class="divBoxes">
        <div
          @click="selectDay(forecast.current, day, null)"
          class="column columnSelected"
        >
          <div class="row">
            <span>dia </span>
            <b>
              {{ day }}
            </b>
          </div>
          <img
            v-if="forecast.current.weather[0].main === 'Clear'"
            img
            src="../assets/clear.png"
            class="mainImg"
          />
          <img
            v-if="forecast.current.weather[0].main === 'Rain'"
            img
            src="../assets/rain.png"
            class="mainImg"
          />
          <img
            v-if="forecast.current.weather[0].main === 'Thunderstorm'"
            img
            src="../assets/thunder.png"
            class="mainImg"
          />
          <img
            v-if="forecast.current.weather[0].main === 'Clouds'"
            img
            src="../assets/cloud.png"
            class="mainImg"
          />
          <img
            v-if="forecast.current.weather[0].main === 'Snow'"
            img
            src="../assets/nevando.png"
            class="mainImg"
          />

          <div class="row">
            <b>{{ toCelsius(forecast.current.temp) }}°C</b>
          </div>
        </div>
        <div
          v-for="(item, index) in days"
          :key="index"
          class="column"
          @click="selectDay(item, day, index)"
        >
          <div class="row">
            <span>dia </span>
            <b>
              {{ day + index + 1 }}
            </b>
          </div>
          <img
            v-if="item.weather[0].main === 'Clear'"
            img
            src="../assets/clear.png"
          />
          <img
            v-if="item.weather[0].main === 'Rain'"
            img
            src="../assets/rain.png"
          />
          <img
            v-if="item.weather[0].main === 'Thunderstorm'"
            img
            src="../assets/thunder.png"
          />
          <img
            v-if="item.weather[0].main === 'Clouds'"
            img
            src="../assets/cloud.png"
          />
          <img
            v-if="item.weather[0].main === 'Snow'"
            img
            src="../assets/nevando.png"
          />
          <div class="row">
            <b class="maxTemp">
              <i class="fas fa-long-arrow-alt-up"></i>
              {{ toCelsius(item.temp.max) }}°
            </b>
            <b class="minTemp">
              <i class="fas fa-long-arrow-alt-down"></i>
              {{ toCelsius(item.temp.min) }}°
            </b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Storage } from "../localStorage";
import { INFOS_CITY } from "../localStorage/storageKeys";
import Lines from "../components/plataform/Lines";
import { kelvinInCelsius } from "../utils/utils";

export default {
  name: "Forecast",
  components: { Lines },
  data() {
    return {
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      city: "",
      day: "",
      month: "",
      year: "",
      dayToShow: "",
      rain: false,
      thunder: false,
      sun: false,
      currentCelsius: null,
      showCelsius: true,
    };
  },

  created() {
    this.getInfo();
  },

  watch: {
    geolocation() {
      const selected = document.getElementsByClassName("column");
      console.log(
        "🚀 ~ file: Forecast.vue ~ line 213 ~ geolocation ~ selected",
        selected
      );
      selected.forEach((item) => {
        if (item.classList.contains("columnSelected"))
          item.classList.remove("columnSelected");
      });
      if (selected.length) selected[0].classList.add("columnSelected");
    },
  },

  computed: {
    ...mapState({
      forecast: (state) => state.infos.forecast,
      geolocation: (state) => state.infos.geolocation,
      celsius: (state) => state.infos.celsius,
      days: (state) => state.infos.days,
      alerts: (state) => state.infos.alerts,
      current: (state) => state.infos.current,
    }),
  },

  methods: {
    async getInfo() {
      this.$store.commit("updateInfos", await Storage.getItem(INFOS_CITY));
      this.currentCelsius = this.celsius;
      console.log("forecast", this.forecast);
      console.log("geolocation", this.geolocation);
      console.log("celsius", this.celsius);
      console.log("days", this.days);
      console.log("alerts", this.alerts);
      this.getDate();
    },

    getDate() {
      this.day = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
    },

    transformToFahrenheit(temp) {
      return ((temp * 9) / 5 + 32).toFixed(0);
    },

    selectDayCurrent() {
      const selected = document.getElementsByClassName("column");
      selected.forEach((item) => {
        if (item.classList.contains("columnSelected"))
          item.classList.remove("columnSelected");
      });
      selected[0].classList.add("columnSelected");
    },

    selectDay(item, day, index) {
      if (!this.celsius.max) this.currentCelsius = this.celsius;
      this.dayToShow = day + index + 1;
      const selected = document.getElementsByClassName("column");
      selected.forEach((item) => {
        if (item.classList.contains("columnSelected"))
          item.classList.remove("columnSelected");
      });
      if (index !== null) {
        selected[index + 1].classList.add("columnSelected");
        this.$store.commit("updateCurrentAndCelsius", {
          current: item,
          celsius: {
            max: this.toCelsius(item.temp.max),
            min: this.toCelsius(item.temp.min),
          },
        });
      } else {
        selected[0].classList.add("columnSelected");
        this.$store.commit("updateCurrentAndCelsius", {
          current: item,
          celsius: this.toCelsius(item.temp),
        });
      }
    },

    toCelsius(temp) {
      return kelvinInCelsius(temp);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 20px 30px;
  height: 830px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.divBoxes {
  display: flex;
}

.card {
  background-color: white;
  height: 700px;
  width: 95%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 20px;
}

.lineAlert {
  background-color: #f8d7db;
  height: 80px;
  width: 95%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: 5px;
}

.title {
  padding: 25px 20px;
  margin-top: 5px;
  color: #004983;
  border-bottom: 2px solid #f2f2f2;
}

.contentCurrent {
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 100;
  border-bottom: 1px solid #f2f2f2;
}

.alert {
  color: red;
  margin: 0px 20px;
}

.column {
  height: 200px;
  width: 100%;
  border: 1px solid #f2f2f2;
  border-top: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.columnSelected {
  background-color: #f2f2f2;
}

.maxTemp {
  color: red;
}

.minTemp {
  color: #00b4cc;
}

.column:hover {
  background-color: #f2f2f2;
}

.row {
  padding: 20px;
}

h1 {
  font-size: 3em;
  margin: 0;
}

.cursorPointer {
  cursor: pointer;
}

img {
  height: 60px;
}

.mainImg {
  margin-right: 30px;
}
</style>
