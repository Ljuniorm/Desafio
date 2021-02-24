<template>
  <div class="appBar wrap">
    <img img src="../../assets/logo.png" alt="" />

    <input
      v-model="city"
      type="text"
      class="searchInput"
      placeholder="Busque por uma cidade..."
    />

    <button @click="searchCity" type="submit" class="searchButton">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
import { getForecast, getGeolocation } from "../../utils/utils";
export default {
  data() {
    return {
      city: "",
      coordinates: null,
    };
  },

  methods: {
    async searchCity() {
      await getGeolocation(this.city).then((response) => {
        console.log(response.data);
        this.coordinates = response.data.results[0].geometry.location;
      });
      this.getForecast();
    },

    getForecast() {
      getForecast(this.coordinates.lat, this.coordinates.lng).then(
        (response) => {
          console.log(response.data);
        }
      );
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
  justify-content: center;
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
  width: 700px;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.searchInput:focus {
  color: #00b4cc;
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
}
</style>