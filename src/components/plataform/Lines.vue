<template>
  <div class="row">
    <div>
      <i :class="icon" class="icon"></i> <span>{{ title }}</span>
    </div>
    <b
      >{{ formatNumber(value) }} <b>{{ sufix }}</b></b
    >
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    value: { type: Number },
    sufix: { type: String },
    icon: { type: String },
  },

  methods: {
    formatNumber(number) {
      return number.toFixed(2).replace(".", ",");
    },
  },
};
</script>

<style  scoped>
.row {
  padding: 20px 20px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: space-around;
}

span {
  font-weight: bolder;
}

.icon {
  margin-right: 15px !important;
  color: #c4dfe6 !important;
}
</style>