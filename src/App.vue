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
    height: 1800px;
  }
}

.container {
  margin: 20px 30px;
  height: 830px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  background-color: white;
  height: 700px;
  width: 95%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 20px;
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
