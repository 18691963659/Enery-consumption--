<template>
  <div class="topps">
    <div class="top">
      <div style="flex: 1"></div>

      <div class="tops" style="flex: 4 10 47%;
    padding-right: 3rem;">
        <img style="width: 21.1875rem; height: 2.625rem; margin-left: 3.125rem; margin-top: 0.4375rem" src="../assets/imgs/lujing35.png"
          alt="" />
        <p class="time">{{ gettime }}&emsp;{{ hh }}:{{ mf }}:{{ ss }}</p>
        <p style="" class="titles">高新·天谷雅舍智能监测大屏</p>
        <div class="left1">
          <img :class="isActiveEnvironment == true ? 'active' : ''"
            style="width: 12.1875rem; height: 2.625rem;  margin-top: 0.4375rem" src="../assets/imgs/lujing6.png"
            alt="" />
          <p to="environment" :class="isActiveEnvironment == true ? 'active' : ''" @click="environment">环境历史记录</p>
        </div>
        <div class="left2">
          <img :class="isActive == true ? 'active' : ''" style="width: 12.1875rem; height: 2.625rem; margin-top: 0.4375rem"
            src="../assets/imgs/lujing34.png" alt="" />
          <p to="environment" :class="isActive == true ? 'active' : ''" @click="wattHour">电表历史记录</p>
        </div>
      </div>

      <div class="goHome" >

        <p style="cursor: pointer;" v-if="shows" @click="backHome">
          返回首页
        </p>
        <img @click="backHome" style="cursor: pointer;" src="../assets/imgs/path.png" v-if="shows" />

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        gettime: "",
        hh: "",
        mf: "",
        ss: "",
        fullscreen: false,
        isActiveEnvironment: false,
        isActive: false,
        shows: false
      };
    },

    mounted() {
     
      console.info(this.shows)
      window.setInterval(() => {
        setTimeout(this.getCurrentTime(), 0);
      }, 1000);
    },

    methods: {
      backHome() {
        this.shows = false;
        
        this.isActiveEnvironment = false;
        this.isActive = false;
        this.$router.push({
          path: "/"
        });
      },
      getCurrentTime() {
        // 获取当前时间并打印
       
        const yy = new Date().getFullYear();
        const mm =
          new Date().getMonth() < 10 ?
          "0" + (new Date().getMonth() + 1) :
          new Date().getMonth() + 1;
        const dd =
          new Date().getDate() < 9 ?
          "0" + (new Date().getDate()) :
          new Date().getDate() + 0;

        const HH =
          new Date().getHours() < 10 ?
          "0" + new Date().getHours() :
          new Date().getHours();
        const mf =
          new Date().getMinutes() < 10 ?
          "0" + new Date().getMinutes() :
          new Date().getMinutes();
        const ss =
          new Date().getSeconds() < 10 ?
          "0" + new Date().getSeconds() :
          new Date().getSeconds();
        this.gettime = yy + "年" + mm + "月" + dd + "日";

        this.hh = HH;
        this.mf = mf;
        this.ss = ss;
      },
      environment() {
        this.shows = true;
        this.isActiveEnvironment = true;
        this.isActive = false;
        this.$router.push({
          path: 'environment'
        })
      },
      wattHour() {
        this.shows = true;
        this.isActiveEnvironment = false;
        this.isActive = true;
        this.$router.push({
          path: 'Meter'
        })

      }
    },
  };
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .active {
    color: #00022C !important;
    background-image: url(../assets/imgs/xz.png);
    background-repeat: repeat;
    background-size: 100% 100%;
  }

  .goHome {
    
    width: 4.5rem;
    height: 1.125rem;
    font-size: 1.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 1.9375rem;
    color: #39ffff;
    opacity: 1;
    display: flex;
    width: 8.125rem;
    margin-top: 0.9375rem;

    img {
      width: 1.1875rem;
      height: 1.1875rem;
      margin-top: 0.3125rem;
      margin-left: 0.3125rem;
    }
  }

  .left1 {
    position: relative;
    cursor: pointer;

    p {
      position: absolute;
      color: #39ffff;
      left: 3rem;
      top: 1.125rem;
    }
  }

  .left2 {
    position: relative;
    cursor: pointer;

    p {
      position: absolute;
      color: #39ffff;
      left: 3rem;
      top: 1.125rem;
    }
  }

  .time {
    width: 14.375rem;
    height: 1.125rem;
    font-size: 1.125rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 3.1875rem;
    color: #39ffff;
    opacity: 1;
    position: absolute;
    left: 7rem;
    
   
  }

  .titles {
    width: 100%;
    text-align: center;
    height: 2rem;

	margin-left: 50px;
    font-size: 2rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 1.5rem;

    color: #39ffff;
    letter-spacing: 0.625rem;
    opacity: 1;
  }

  .top {
    display: flex;
    margin-top: 2rem;


    .tops {
      display: flex;
      background-image: url(~@/assets/imgs/btk.png);
      background-size: 100% 3.5rem;

      margin: auto;
      background-repeat: no-repeat;
    }

    div {
     
      height: 5.375rem;
      position: relative;
    }
  }
</style>