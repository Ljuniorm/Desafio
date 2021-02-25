<template>
  <div class="router">
    <AppBar />
    <router-view class="router" />
    <footer></footer>
  </div>
</template>

<script>
import AppBar from "./components/global/AppBar";
export default {
  components: { AppBar },
};
</script>

<style >
* {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  font-family: "Montserrat", Oswald, Roboto, sans-serif;
  margin: 0;
}

@media (max-width: 780px) {
  .router {
    height: 1600px;
  }
}

.router {
  background-color: #f2f2f2;
}

footer {
  height: 8px;
  color: #c4dfe6;
}

i,
img {
  background-color: transparent;
}
</style>
