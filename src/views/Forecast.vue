<template>
  <div v-if="forecast" class="container">
    <div v-for="(item, index) in alerts" :key="index" class="lineAlert">
      <i class="fas fa-exclamation-triangle alert"></i>
      {{ item.description }}
    </div>

    <div v-if="forecast && current" class="card">
      <div class="rowTitle">
        <h3>
          Previsão de {{ day }} de {{ months[month] }} de {{ year }}
          {{ cityName }}
          <i class="fas fa-map-marker-alt"></i>
        </h3>
        <button @click="currentTemp">Condições Atuais</button>
      </div>
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
          v-if="
            current.weather[0].main === 'Clouds' ||
            current.weather[0].main === 'Mist'
          "
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
          v-for="(item, index) in days"
          :key="index"
          class="column"
          @click="selectDay(item, item.date, index)"
        >
          <div class="row">
            <b>
              {{ item.date.day }}
              {{ months[item.date.month] }}
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
            v-if="
              item.weather[0].main === 'Clouds' ||
              item.weather[0].main === 'Mist'
            "
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
import { mapMutations, mapState } from "vuex";
import { UPDATE_INFO, UPDATE_CURRENT_CELSIUS } from "../store/mutationTypes";
import { Storage } from "../localStorage";
import { INFOS_CITY, HISTORIC } from "../localStorage/storageKeys";
import Lines from "../components/platform/Lines";
import { kelvinInCelsius } from "../utils/utils";

export default {
  name: "Forecast",
  components: { Lines },
  data() {
    return {
      months: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      city: "",
      day: "",
      month: "",
      year: "",
      currentCelsius: null,
      cityName: "",
    };
  },

  created() {
    this.getInfo();
  },

  watch: {
    forecast() {
      this.getHistoric();
    },
  },

  computed: {
    ...mapState({
      forecast: (state) => state.infos.forecast,
      celsius: (state) => state.infos.celsius,
      days: (state) => state.infos.days,
      alerts: (state) => state.infos.alerts,
      current: (state) => state.infos.current,
    }),
  },

  methods: {
    ...mapMutations({ UPDATE_INFO, UPDATE_CURRENT_CELSIUS }),

    async getInfo() {
      this.UPDATE_INFO(await Storage.getItem(INFOS_CITY));
      this.currentCelsius = this.celsius;
      this.getHistoric();
      console.log("name", this.nameCity);
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

    currentTemp() {
      this.mapClass(null);
      this.UPDATE_CURRENT_CELSIUS({
        current: this.forecast.current,
        celsius: this.toCelsius(this.forecast.current.temp),
      });
    },

    selectDay(item, date, index) {
      if (!this.celsius.max) this.currentCelsius = this.celsius;
      this.day = date.day;
      this.month = date.month;
      this.mapClass(index);
      this.UPDATE_CURRENT_CELSIUS({
        current: item,
        celsius: {
          max: this.toCelsius(item.temp.max),
          min: this.toCelsius(item.temp.min),
        },
      });
    },

    mapClass(index) {
      const selected = document.getElementsByClassName("column");
      selected.forEach((item) => {
        if (item.classList.contains("columnSelected"))
          item.classList.remove("columnSelected");
      });
      if (index !== null) selected[index].classList.add("columnSelected");
    },

    toCelsius(temp) {
      return kelvinInCelsius(temp);
    },

    async getHistoric() {
      const historic = await Storage.getItem(HISTORIC);
      if (historic)
        historic.forEach((item) => {
          if (item.name === this.$route.params.city) {
            this.cityName = item.city;
          }
        });
      console.log(
        "🚀 ~ file: Forecast.vue ~ line 261 ~ historic.forEach ~ this.cityName ",
        this.cityName
      );
    },
  },
};
</script>

<style scoped>
.divBoxes {
  display: flex;
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

.contentCurrent {
  padding: 20px;
  display: flex;
  flex-direction: row;
  width: 100;
  border-bottom: 1px solid #f2f2f2;
  justify-content: center;
}

.alert {
  color: red;
  margin: 0px 20px;
}

.rowTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f2f2f2;
  color: #004983;
  padding: 25px 20px;
  margin-top: 5px;
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

button {
  margin-right: 60px;
  padding: 10px 40px;
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

@media (max-width: 780px) {
  .divBoxes {
    display: flex;
    flex-direction: column;
  }

  .lineAlert {
    height: 200px !important;
    padding: 10px !important;
    font-size: 0.8em;
  }

  .column {
    height: 100px !important;
    display: flex;
  }

  .rowTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    margin: 0px !important;
  }

  h3 {
    margin: 20px;
  }

  .card {
    height: 1600px !important;
    padding: 10px !important;
  }

  .row {
    padding: 0 !important;
  }

  h1 {
    font-size: 1.3em !important;
  }

  .contentCurrent {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    margin-left: 10px;
  }

  .mainImg {
    margin-right: 5px !important;
  }
}
</style>
