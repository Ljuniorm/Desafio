<template>
  <div class="container">
    <div class="line">EAE</div>
    <div class="card">EAE</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Main",
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

.card {
  background-color: white;
  height: 700px;
  width: 1100px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

.line {
  background-color: white;
  height: 100px;
  width: 1100px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
</style>
