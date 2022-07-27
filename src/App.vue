<template>
  <div id="app">
    <div class="ScreenAdapter" :style="style">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "1920"
    },
    height: {
      type: String,
      default: "1080"
    }
  },
  data() {
    return {
      style: {
        width: this.width + "px",
        height: this.height + "px",
        transform: "scale(1) translate(-50%, -50%)"
      }

    }
  },
  mounted(){
    this.setScale();
    window.onresize = this.Debounce(this.setScale, 1000);
  },
   methods: {
    Debounce: (fn, t) => {
      const delay = t || 500;
      let timer;
      return function () {
        const args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, delay);
      };
    },
    getScale() {
      const w = window.innerWidth / this.width;
      const h = window.innerHeight / this.height;
      return w < h ? w : h;
    },
    setScale() {
      this.style.transform =
        "scale(" + this.getScale() + ") translate(-50%, -50%)";
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/imgs/bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}

.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
</style>
