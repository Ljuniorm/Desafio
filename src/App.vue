<template>
  <div>
    <AppBar />
    <router-view />
  </div>
</template>

<script>
import AppBar from "./components/global/AppBar";
export default {
  components: { AppBar },
};
</script>

<style>
* {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  font-family: "Montserrat", Oswald, Roboto, sans-serif;
  margin: 0;
}
</style>
