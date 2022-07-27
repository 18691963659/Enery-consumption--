<template>
<div>
    <div class="top" style="100%"><Tops /></div>
    <div class="content">
      <router-view />
    </div>
</div>
</template>

<script>
import drawMixin from "../utils/drawMixin";

import Tops from "../components/header.vue";
export default {
  mixins: [drawMixin],
  data() {
    return {};
  },
  components: { Tops },
  mounted() {

  },

  methods: {
  
  },
};
</script>

<style lang="scss" scoped>

</style>
