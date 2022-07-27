<template>
  <Echart :options="options" :id="id" :height="height" :width="width"></Echart>
</template>
<script>
import Echart from "@/common/echart";
export default {
  props: {
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "2.5rem",
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Echart,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>