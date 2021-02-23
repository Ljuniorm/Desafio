<template>
  <div class="appBar wrap">
    <img img src="../../assets/logo.png" alt="" />

    <input
      type="text"
      class="searchTerm"
      placeholder="Busque por uma cidade..."
    />

    <button @click="searchCity" type="submit" class="searchButton">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
import { getGeolocation } from "../../utils/utils";
export default {
  methods: {
    searchCity() {
      getGeolocation("florianopolis").then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
.appBar {
  background-color: #c4dfe6;
  height: 80px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  margin-right: 50px;
}

body {
  background: #f2f2f2;
  font-family: "Open Sans", sans-serif;
}

.searchTerm {
  width: 100%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 20px;
  width: 700px;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.searchTerm:focus {
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
}
</style>