<template>
  <div class="nr">
    <div class="top" style="100%">
      <Tops />
    </div>
    <div class="one">
      <div class="btn">
        <div @click="wattHour" :class="isActive == true ? 'active' : ''">主卧</div>
        <div @click="wattHours" :class="isActives == true ? 'active' : ''">书房</div>
        <div @click="wattHourss" :class="isActivess == true ? 'active' : ''">茶室</div>
        <div @click="wattHoursss" :class="isActivesss == true ? 'active' : ''">客厅</div>
        <div @click="wattHourssss" :class="isActivessss == true ? 'active' : ''">老人房</div>
        <div @click="wattHoursssss" :class="isActivesssss == true ? 'active' : ''">厨房</div>
        <div style="width:70px ;" @click="wattHourssssss" :class="isActivessssss == true ? 'active' : ''">老人房卫</div>

      </div>
      <div class="left1" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">温度</span>
        <span class="wzz">单位：℃</span>

        <brokenLine v-if="isShow==true" id="one" class="myone"></brokenLine>

        <p v-else-if="isShow==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px">
          <img style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>

      <div class="left2" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">湿度</span>
        <span class="wzz">单位：%RH</span>
        <brokenLine v-if="isShow1==true" id="two" class="myone"></brokenLine>
        <p v-else-if="isShow1==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>

      <div class="left3" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">PM2.5</span>
        <span class="wzz">单位：μg/m³</span>
        <brokenLine v-if="isShow2==true" id="three" class="myone"></brokenLine>
        <p v-else-if="isShow2==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>
      <div class="left4" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">PM10</span>
        <span class="wzz">单位：μg/m³</span>
        <brokenLine v-if="isShow3==true" id="fore" class="myone"></brokenLine>
        <p v-else-if="isShow3==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>
      <div class="left5" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">CO₂</span>
        <span class="wzz">单位：ppm</span>
        <brokenLine v-if="isShow4==true" id="aa" class="myone"></brokenLine>
        <p v-else-if="isShow4==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>


    </div>
    <div class="two">
      <div style="color:#FFFFFF;line-height:40px;">查询日期:
        <el-date-picker v-model="value1" :clearable="false" @change="sz()" type="date" :picker-options="pickerOptions"
          value-format="yyyy-MM-dd" placeholder="选择日期">
        </el-date-picker>
         <div class="left10" >
        
          <p to="environment" style="border:1px solid #39ffff;" :class="isActive == true ? 'active' : ''" @click="wattHoura">电表历史记录</p>
        </div>
      </div>  
       
      <img class="middel" src="../assets/imgs/41.png" alt="" />
    </div>
    <div class="three">
      <div class="tips">
        <div style="line-height:36px">高新·天谷雅舍室外无人值守气象站历史数据</div>
      </div>
      <div class="right1" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">风速</span>
        <span class="wzz">单位：m/s</span>
        <brokenLine v-if="isShow5==true" id="five" class="myone"></brokenLine>
        <p v-else-if="isShow5==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>
      <div class="right2" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">风向</span>
        <span class="wzz"></span>
        <brokenLine v-if="isShow6==true" id="six" class="myone"></brokenLine>
        <p v-else-if="isShow6==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>
      <div class="right3" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">噪声</span>
        <span class="wzz">单位：dB</span>
        <brokenLine v-if="isShow7==true" id="seven" class="myone"></brokenLine>
        <p v-else-if="isShow7==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>

      <div class="right5" style="flex: 1.2">
        <div class="zbcs"></div>
        <span class="wz">太阳辐射</span>
        <span class="wzz" style="margin-left: -10px;">单位：W/m²</span>
        <brokenLine v-if="isShow9==true" id="eights" class="myone"></brokenLine>
        <p v-else-if="isShow9==false"
          style="color:white;font-size:20px;text-align: center;line-height: 50px;letter-spacing:5px"> <img
            style="margin-left:50px" src="../assets//imgs/zwsj.png" alt="">
          <span class="zwsj">暂无数据</span>
        </p>

      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  // import * as echarts from 'echarts';
  // import Tops from "../components/header.vue";
  import brokenLine from "../components/echart/brokenLine/brokenline.vue";
  // axios.defaults.baseURL = "https://weixin.baierinfo.com/app";
  // const url = 'https://weixin.baierinfo.com/app'
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate: time => {
            return (
              time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000 * 30 ||
              time.getTime() > new Date().getTime()
            )
          },
        },
        dataerwu2: [],
        dataerwu: [],
        data10: [],
        symbolRotat: [],
        time: [],
        data102: [],
        FirstList: [],
        dataone: [],
        datatwo: [],
        datasix: [],
        fs: [],
        shuzu: [],
        coordsArray: "",
        a: "",
        b: "",
        value1: '',
        datafive: [
          [1653962400000, 50.568],
          [1653958800000, 50.704],
          [1653955200000, 51.836]
        ],
        roomtype: "temperature",
        sensornum: 'BR86ENV042705',
        isActive: true,
        isActives: false,
        isActivess: false,
        isActivesss: false,
        isActivessss: false,
        isActivesssss: false,
        isActivessssss: false,
        shows: '',
        isShow: true,
        isShow1: true,
        isShow2: true,
        isShow3: true,
        isShow4: true,
        isShow5: true,
        isShow6: true,
        isShow7: true,
        isShow8: true,
        isShow9: true
      };
    },

    components: {
      brokenLine,
    },
    mounted() {

      var date = new Date();



      date.getFullYear(); //获取完整的年份(4位)

      date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

      date.getDate(); //获取当前日(1-31)

      this.value1 = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

      this.shows = localStorage.setItem('shows', true);
      //  this.shows=localStorage.getItem('shows')
      //  console.log(this.shows)
      this.getFirstList();
      this.getFirstList1();
      this.getFirstList2();
      this.getFirstList3();
      this.getFirstList4();
      this.getFirstList5();
      this.getFirstList6();
      this.getFirstList7();

      this.getFirstList8();
      this.getFirstList9();
      this.getFirstListfs();
      this.getFirstListzs();
      this.getFirstListfx();
      this.drawBrokenLine();
      this.drawBrokenLineTwo();
      this.drawBrokenLineThree();
      this.drawBrokenLineFore();
      this.drawBrokenLineFive();
      this.drawBrokenLineleft();
      this.drawBrokenLineSix();
      this.drawBrokenLineSeven();
      this.drawBrokenLineEight();
      this.drawBrokenLineEights();



      window.setInterval(() => {
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();

        this.getFirstList8();
        this.getFirstList9();
        this.getFirstListfs();
        this.getFirstListzs();
        this.getFirstListfx();
        this.drawBrokenLine();
        this.drawBrokenLineTwo();
        this.drawBrokenLineThree();
        this.drawBrokenLineFore();
        this.drawBrokenLineFive();
        this.drawBrokenLineleft();
        this.drawBrokenLineSix();
        this.drawBrokenLineSeven();
        this.drawBrokenLineEight();
        this.drawBrokenLineEights();
      }, 300000);
    },
    methods: {
      
      sz() {
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();

        this.getFirstList8();
        this.getFirstList9();
        this.getFirstListfs();
        this.getFirstListzs();
        this.getFirstListfx();

      },
      //温度求
      getFirstList() {
        // console.log('1111')

        axios.get('https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=' + this.sensornum +
            '&type=temperature&downsample=1h&startTime=' + this.value1 + ' 00:00:01&endTime=' + this.value1 +
            ' 23:00:01&model=avg', ).then((res) => {
            if (res.data.data.data) {
              // console.log(res.data.data.data,'13123213')
              this.isShow = true
              // console.log(res.data.data.data, '1111')
              this.dataone = res.data.data.data


              // this.drawBrokenLine(res.data.data.data)
            } else {
              this.dataone =[]
        this.drawBrokenLine(this.dataone, this.datafive)
              this.isShow = false
              // this.drawBrokenLine(res.data.data.data)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
        wattHoura() {
        this.shows = true;
        this.isActiveEnvironment = false;
        this.isActive = true;
        this.$router.push({
          path: 'Meter'
        })

      },
      wattHour() {

        this.isActive = true;
        this.isActives = false;
        this.isActivess = false;
        this.isActivesss = false;
        this.isActivessss = false;
        this.isActivesssss = false;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042704'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();

        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },
      wattHours() {
        this.isActive = false;
        this.isActives = true;
        this.isActivess = false;
        this.isActivesss = false;
        this.isActivessss = false;
        this.isActivesssss = false;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042703'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();

        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },
      wattHourss() {
        this.isActive = false;
        this.isActives = false;
        this.isActivess = true;
        this.isActivesss = false;
        this.isActivessss = false;
        this.isActivesssss = false;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042702'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();
        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },

      wattHoursss() {
        this.isActive = false;
        this.isActives = false;
        this.isActivess = false;
        this.isActivesss = true;
        this.isActivessss = false;
        this.isActivesssss = false;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042701'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();
        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },

      wattHourssss() {
        this.isActive = false;
        this.isActives = false;
        this.isActivess = false;
        this.isActivesss = false;
        this.isActivessss = true;
        this.isActivesssss = false;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042705'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();
        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },
      wattHoursssss() {
        this.isActive = false;
        this.isActives = false;
        this.isActivess = false;
        this.isActivesss = false;
        this.isActivessss = false;
        this.isActivesssss = true;
        this.isActivessssss = false;
        this.sensornum = 'BR86ENV042706'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();
        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },
      wattHourssssss() {
        this.isActive = false;
        this.isActives = false;
        this.isActivess = false;
        this.isActivesss = false;
        this.isActivessss = false;
        this.isActivesssss = false;
        this.isActivessssss = true;
        this.sensornum = 'BR86ENV042707'
        this.getFirstList();
        this.getFirstList1();
        this.getFirstList2();
        this.getFirstList3();
        this.getFirstList4();
        this.getFirstList5();
        this.getFirstList6();
        this.getFirstList7();
        this.getFirstList8();
        this.getFirstList9();
        // this.$router.push({ path: 'Meter' })

      },
      //湿度请求
      getFirstList1() {

        axios.get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=' + this.sensornum +
            '&type=humidity&downsample=1h&startTime=' + this.value1 + ' 00:00:01&endTime=' + this.value1 +
            ' 23:00:01&model=avg'
          ).then((res) => {
            if (res.data.data.data) {
              // console.log('rsda',res.data.data.data)
              this.isShow1 = true
              // this.drawBrokenLineTwo(res.data.data.data)
              this.datatwo = res.data.data.data
              // console.log(res.data.data.data)
              // this.datatwo=res.data.data.data

            } else {
              this.datatwo=[]
              this.isShow1 = false

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //PM2/5请求
      getFirstList2() {
        axios
          .get('https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=' + this.sensornum +
            '&type=pm2.5&downsample=1h&startTime=' + this.value1 + ' 00:00:01&endTime=' + this.value1 +
            ' 23:00:01&model=avg',
          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow2 = true
              // this.drawBrokenLineThree(res.data.data.data)
              this.dataerwu = res.data.data.data
            } else {
                    this.dataerwu = []
              this.isShow2 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //PM10请求
      getFirstList3() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=' + this.sensornum +
            '&type=pm10&downsample=1h&startTime=' + this.value1 + ' 00:00:01&endTime=' + this.value1 +
            ' 23:00:01&model=avg',
          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow3 = true
              this.pm10 = res.data.data.data
              // this.drawBrokenLineFore(res.data.data.data)
            } else {
              this.pm10=
              this.isShow3 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //Co2请求
      getFirstList4() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=' + this.sensornum +
            '&type=carbon_dioxide&downsample=1h&startTime=' + this.value1 + ' 00:00:01&endTime=' + this.value1 +
            ' 23:00:01&model=avg',
          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow4 = true
              this.drawBrokenLineleft(res.data.data.data)
            } else {
              this.isShow4 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //户外温度
      getFirstList5() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=temperature&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow5 = true
              this.datafive = res.data.data.data
              // console.log(this.datafive, 9938)
              this.drawBrokenLine(this.dataone, this.datafive)
            } else {
               this.datafive=[]
                 this.drawBrokenLine(this.dataone, this.datafive)
              this.isShow5 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //户外湿度
      getFirstList6() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=humidity&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'


          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow6 = true
              this.datasix = res.data.data.data
              this.drawBrokenLineaa(this.datatwo, this.datasix)
              // console.log(this.datatwo,this.datasix,'111')
            } else {
              this.datasix=[]
                 this.drawBrokenLineaa(this.datatwo, this.datasix)
              this.isShow6 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //户外Pm2.5
      getFirstList7() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=pm2.5&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'


          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow7 = true
              this.dataerwu2 = res.data.data.data
              this.drawBrokenLineThree(this.dataerwu, this.dataerwu2)
            } else {
              this.dataerwu2=[]
                    this.drawBrokenLineThree(this.dataerwu, this.dataerwu2)
              this.isShow7 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //户外pm10
      getFirstList8() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=pm10&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow8 = true
              this.pm102 = res.data.data.data
              this.drawBrokenLineFore(this.pm10, this.pm102)
            } else {
               this.pm102 =[]
              this.drawBrokenLineFore(this.pm10, this.pm102)
              this.isShow8 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //太阳辐射
      getFirstList9() {
        axios


          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=rs_ra&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow9 = true
              this.drawBrokenLineEights(res.data.data.data)
            } else {
              this.isShow9 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      //风速
      getFirstListfs() {
        axios
          .get(
            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=wind_speed&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.drawBrokenLineFive(res.data.data.data)
              this.isShow9 = true
              let shuzu = eval('(' + res.data.data.data + ')').reverse();
              // console.log(shuzu);
              for (var i = 0; i < shuzu.length + 1; i++) {
                this.fs.push(shuzu[i][1])
                // console.log(this.fs, '31313')
              }
              // console.log(res.data.data.data, '111111')



            } else {
              this.isShow9 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //风向
      getFirstListfx() {
        axios
          .get(

            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=wind_direction&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow9 = true
              let shuzu = eval('(' + res.data.data.data + ')').reverse();
              // console.log(shuzu);
              this.shuzu=[]
              for (var i = 0; i < shuzu.length + 1; i++) {
                // console.log(shuzu[i][1].toFixed(0),'1111')
                // this.eledatas.push([shuzu[i][0], shuzu[i + 1][1] - shuzu[i][1]])
                if (shuzu[i][1].toFixed(0) == '0') {
                  this.symbolRotate = 0
                } else if (shuzu[i][1].toFixed(0) == '1') {
                  this.symbolRotate = 1

                } else if (shuzu[i][1].toFixed(0) == '2') {
                  this.symbolRotate = 2

                } else if (shuzu[i][1].toFixed(0) == '3') {
                  this.symbolRotate = 3

                } else if (shuzu[i][1].toFixed(0) == '4') {
                  this.symbolRotate = 4

                } else if (shuzu[i][1].toFixed(0) == '5') {
                  this.symbolRotate = 5

                } else if (shuzu[i][1].toFixed(0) == '6') {
                  this.symbolRotate = 6

                } else if (shuzu[i][1].toFixed(0) == '7') {
                  this.symbolRotate = 7

                }
                this.time.push(shuzu[i][0])
                this.symbolRotat.push(this.symbolRotate)

                this.shuzu.push([shuzu[i][0], this.fs[i], this.symbolRotate + 0.75])
                // console.log(this.time)
                // console.log(this.symbolRotat)
                // let size = this.time.length;
                // for (let i = 0; i < size; i++) {

                //    this.shuzu.push(this.fs[i]);
                // }

                // console.log(this.shuzu, '22222');
                this.drawBrokenLineSix(this.shuzu)
              }


            } else {
              this.isShow9 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //风速
      getFirstListzs() {
        axios
          .get(

            'https://weixin.baierinfo.com/app/getDataByDownsampleDate?sensornum=tgyy2205oe01&equipmentId=3&type=noise&downsample=1h&startTime=' +
            this.value1 + ' 00:00:01&endTime=' + this.value1 + ' 23:00:01&model=avg'

          )
          .then((res) => {
            if (res.data.data.data) {
              this.isShow9 = true
              // console.log(res.data.data.data, '111111')
              this.drawBrokenLineSeven(res.data.data.data)
            } else {
              this.isShow9 = false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //温度

      drawBrokenLine(data1, data9) {
// console.log(data1, data9,'78979')
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("one"))

          var option = {

            xAxis: {
              type: "time",

              show: true,
              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },

                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },

            tooltip: {
           trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
            },
            legend: {
              data: ['室外温度', '室内温度'],
              bottom: '10%',
              textStyle: {
                color: 'white'
              },

            },
            // formatter: function (params) {
            //   // console.log(params)
            //   var date = new Date(params[0].data[0])
            //   var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            //   var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
            //   var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            //   var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            //   var year = date.getFullYear()
            //   let str = ' ';

            //   str =
            //     '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
            //     "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
            //     '日' + hours + ':' + minutes +
            //     "<br>" +
            //     '室内温度：' +
            //     parseFloat(params[0].data[1]).toFixed(1) + '℃' + "<br>" +
            //     '室外温度：' + parseFloat(params[1].data[1]).toFixed(1) + '℃'



            //   "</div>" +
            //   "</div>";
            //   return str

            // },
            yAxis: {
              show: true,
              position: 'left',
              min: 0,
              max: 48,
              interval: 13,
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },


            series: [{
                data: eval(data1),
                name: '室内温度',
                type: "line",


                color: "#00E7FE",
              },
              {
                data: eval(data9),
                name: '室外温度',
                type: "line",

                color: "#5F50E5",
              },
            ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },

      drawBrokenLineaa(data2, data3) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("two"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
                tooltip: {
           trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
            },
            legend: {
              data: ['室外湿度', '室内湿度'],
              bottom: '10%',
              textStyle: {
                color: 'white'
              }
            },
            // formatter: function (params) {
            //   // console.log(params)
            //   var date = new Date(params[0].data[0])
            //   var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            //   var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
            //   var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            //   var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            //   var year = date.getFullYear()
            //   let str = ' ';

            //   str =
            //     '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
            //     "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
            //     '日' + hours + ':' + minutes +
            //     "<br>" +
            //     '湿度：' +
            //     parseFloat(params[0].data[1]).toFixed(1) + '%RH'

            //   "</div>" +
            //   "</div>";
            //   return str

            // },
            yAxis: {
              min: 0,
              max: 100,
              interval: 30,
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            series: [{
                data: eval(data2),
                type: "line",
                name: '室内湿度',
                smooth: true,
                color: "#00E7FE",
              },
              {
                data: eval(data3),
                type: "line",
                name: '室外湿度',
                smooth: true,
                color: "#5F50E5",
              },
            ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },
      drawBrokenLineThree(data3, data4) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("three"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
               tooltip: {
           trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
            },
            legend: {
              data: ['室外PM2.5', '室内PM2.5'],
              bottom: '10%',
              textStyle: {
                color: 'white'
              }
            },
            yAxis: {
              min: 0,
              max: 200,
              interval: 60,
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            series: [{
              data: eval(data3),
              type: "line",
              smooth: true,
              name: '室内PM2.5',
              color: "#00E7FE",

            }, {
              data: eval(data4),
              type: "line",
              smooth: true,
              name: '室外PM2.5',
              color: "#5F50E5",
            }, ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },
      drawBrokenLineFore(data4, data5) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("fore"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            yAxis: {
              min: 0,
              max: 200,
              interval: 60,
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
                 tooltip: {
           trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
            },
            legend: {
              data: ['室外PM10', '室内PM10'],
              bottom: '10%',
              textStyle: {
                color: 'white'
              }
            },
            series: [{
                data: eval(data4),
                type: "line",
                smooth: true,
                color: "#00E7FE",
                name: '室内PM10'
              },
              {
                data: eval(data5),
                type: "line",
                smooth: true,
                color: "#5F50E5",
                name: '室外PM10'
              },
            ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },
      //二氧化碳
      drawBrokenLineleft(data5) {

        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("aa"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            yAxis: {

              min: 200,
              max: 2000,
              interval: 600,
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            formatter: function (params) {
              // console.log(params)
              var date = new Date(params[0].data[0])
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var year = date.getFullYear()
              let str = ' ';

              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
                "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
                '日' + hours + ':' + minutes +
                "<br>" +
                'CO₂：' +
                parseFloat(params[0].data[1]).toFixed(1) + 'ppm'

              "</div>" +
              "</div>";
              return str

            },
            series: [{
              data: eval(data5),
              type: "line",
              smooth: true,
              color: "#00E7FE",
            }, ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },


      drawBrokenLineFive(data6) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("five"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            yAxis: {
              type: "value",

              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            tooltip: {
              trigger: 'axis',

              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            formatter: function (params) {
              // console.log(params)
              var date = new Date(params[0].data[0])
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var year = date.getFullYear()
              let str = ' ';

              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
                "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
                '日' + hours + ':' + minutes +
                "<br>" +
                '风速：' +
                parseFloat(params[0].data[1]).toFixed(1) + 'm/s'

              "</div>" +
              "</div>";
              return str

            },
            series: [{
              data: eval(data6),
              type: "line",
              smooth: true,
              color: "#00E7FE",
            }, ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);

      },
      drawBrokenLineSix(data1) {

        setTimeout(() => {


          var myChart = this.$echarts.init(document.getElementById("six"));
          //数据参数顺序
          var dims = {
            time: 0,
            windSpeed: 1,
            R: 2
          };
          //箭头大小
          var arrowSize = 20;
          //方向绘制
          function renderArrow(param, api) {
            var point = api.coord([
              api.value(dims.time),
              api.value(dims.windSpeed)
            ]);

            return {
              type: 'path',
              shape: {
                pathData: 'M31 16l-15-15v9h-26v12h26v9z',
                x: -arrowSize / 2,
                y: -arrowSize / 2,
                width: arrowSize,
                height: arrowSize
              },
              rotation: api.value(dims.R),
              position: point,
              style: api.style({
                stroke: '#FFF',
                lineWidth: 1
              })
            };
          }

          var option = {
            title: {

              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                return [

                  '风速：' + params[0].value[dims.windSpeed].toFixed(1) + 'm/s',
                  '风向：' + (params[0].value[dims.R] == 0.75 ? '东风' : (params[0].value[dims.R] == 1.75 ? '西北风' :
                    (
                      params[0].value[dims.R] == 2.75 ? '西风' : (params[0].value[dims.R] == 3.75 ? '西南风' : (
                        params[
                          0].value[dims.R] == 4.75 ? '南风' : (params[0].value[dims.R] == 5.75 ? '东南风' : (
                          params[
                            0].value[dims.R] == 6.75 ? '东北风' : '北风')))))))

                ].join('<br>');
              },
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            grid: {

            },
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },

            yAxis: [{

              nameLocation: 'middle',
              nameGap: 35,
              axisLine: {
                lineStyle: {
                  color: '#FFF'
                }
              },
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#FFF'
                }
              }
            }, {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }],
            series: [{
              type: 'custom',
              renderItem: renderArrow,


              smooth: true,
              color: "#00E7FE",
              encode: {
                x: dims.time,
                y: dims.windSpeed
              },
              data: data1,
              z: 10
            }, {
              type: 'line',
              symbol: 'none',
              encode: {
                x: dims.time,
                y: dims.windSpeed
              },
              lineStyle: {
                normal: {
                  color: '#00E7FE',
                  type: 'line'
                }
              },
              data: data1,
              z: 1
            }]
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);
      },
      drawBrokenLineSeven(data8) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("seven"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            yAxis: {
              type: "value",
              min: 20,
              max: 100,
              interval: 25,
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },

            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            formatter: function (params) {
              // console.log(params)
              var date = new Date(params[0].data[0])
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var year = date.getFullYear()
              let str = ' ';

              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
                "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
                '日' + hours + ':' + minutes +
                "<br>" +
                '噪声：' +
                parseFloat(params[0].data[1]).toFixed(0) + 'dB'

              "</div>" +
              "</div>";
              return str

            },
            series: [{
              data: eval(data8),
              type: "line",
              smooth: true,
              color: "#00E7FE",
            }, ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);
      },
      drawBrokenLineEight(data9) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("eight"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            formatter: function (params) {
              // console.log(params)
              var date = new Date(params[0].data[0])
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var year = date.getFullYear()
              let str = ' ';

              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
                "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
                '日' + hours + ':' + minutes +
                "<br>" +
                'PM10：' +
                parseFloat(params[0].data[1]).toFixed(1) + 'μg/m³'

              "</div>" +
              "</div>";
              return str

            },
            yAxis: {
              type: "value",
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            series: [{
              data: eval(data9),
              type: "line",
              smooth: true,
              color: "#00E7FE",
            }, ],
          };

          myChart.clear()
          myChart.setOption(option, true);

        }, 200);
      },
      drawBrokenLineEights(data10) {
        setTimeout(() => {
          var myChart = this.$echarts.init(document.getElementById("eights"));
          var option = {
            xAxis: {
              type: "time",

              axisLabel: {
                showMaxLabel: true,
                formatter: function (cellValue) {
                  var date = new Date(cellValue)
                  // var year = date.getFullYear()
                  // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                  // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                  // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                  return hours + ':' + minutes
                },
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            formatter: function (params) {
              // console.log(params)
              var date = new Date(params[0].data[0])
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var year = date.getFullYear()
              let str = ' ';

              str =
                '<div style="width:100%;padding:10px 15px 10px 15px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;">' +
                "<div style='display:flex;align-items:center;'>" + year + '年' + month + '月' + day +
                '日' + hours + ':' + minutes +
                "<br>" +
                '太阳辐射：' +
                parseFloat(params[0].data[1]).toFixed(0) + 'MJ/㎡'

              "</div>" +
              "</div>";
              return str

            },
            yAxis: {
              type: "value",
              min: 0,
              max: 1200,
              interval: 400,
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  color: "white",
                },
              },
              splitLine: {
                show: false
              },
            },
            series: [{
              data: eval(data10),
              type: "line",
              smooth: true,
              color: "#00E7FE",
            }, ],
          };
          myChart.clear()
          myChart.setOption(option, true);
        }, 200);
      },

    },
  };
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .myone {
    height: 100% !important;
    width: 100% !important;
    margin-top: -60px;
  }

  .tips {
    width: 380px;
    height: 36px;
    background: #00a2ff;
    opacity: 1;
    border-radius: 4px;
    margin-bottom: 15px;
    // padding-left: 16px;

    div {
      width: 380px;
      height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 27px;
      color: #ffffff;
      opacity: 1;
      text-align: center;
    }
  }

  .btn {

    margin-left: 10px;

    margin-bottom: 15px;
    display: flex;

    .active {
      background-color: #00a2ff;
      color: white;

    }

    div {
      cursor: pointer;

      width: 55px;
      height: 36px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 27px;
      color: #00a2ff;
      background-color: none;
      border: 1px solid #00a2ff;
      border-radius: 4px;
      text-align: center;
      margin-right: 8px;
    }
  }

  .right1s {
    display: flex;
    height: 140px;

    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: 27px;
    color: #ffffff;
    opacity: 1;

    div {
      flex: 1;

      p {
        height: 16px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 27px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }

  .middel {
    position: absolute;
    left: 35rem;

    top: 13.3125rem;
  }

  .left4s {
    display: flex;

    div {
      flex: 1;
      height: 170px;
      margin: 7px;
    }
  }

  .lefts2 {
    display: flex;

    div {
      flex: 1;
      width: 132px;
      height: 120px;
      background: rgba(60, 74, 145, 0.1);
      opacity: 1;
      margin: 10px;
    }
  }

  .list1 {
    display: flex;
    flex: 1;
    margin-left: 10px;
    height: 14px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.45);
    opacity: 1;
  }

  .list2 {
    span {
      height: 14px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: #ffffff;
      opacity: 1;
    }

    width: 290px;
    height: 30px;
    margin-left: 10px;
    margin-top: 6px;
    background: rgba(60, 74, 145, 0.1);
    opacity: 1;

    display: flex;
    flex: 1;
  }

  .listbottom {
    span {
      height: 14px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      line-height: 24px;
      color: #ffffff;
      opacity: 1;
    }

    height: 30px;
    margin-left: 10px;
    margin-top: 6px;
    background: rgba(60, 74, 145, 0.1);
    opacity: 1;

    display: flex;
    flex: 1;
  }

  .wz {
    width: 72px;

    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 31px;
    color: #ffffff;
    opacity: 1;
    position: relative;
    left: 30px;
    top: -25px;
  }

  .wzz {
    width: 72px;

    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 31px;
    color: #ffffff;
    opacity: 1;
    position: relative;
    right: -300px;
    top: -25px;
  }

  ::v-deep .el-input__inner {
    background-color: rgba(0, 162, 255, 0.04);
    height: 30px;
    color: #FFFFFF;
    width: 90px;
  }

  ::v-deep .el-input__inner {
    width: 154px;
    height: 28px;
  }

  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 160px;
  }

  ::v-deep .el-input__icon {
    line-height: 0px;
  }

  ::v-deep.el-select-dropdown__item {
    background-color: rgba(0, 162, 255, 0.04);
  }

  .left1 {
    background-image: url(~@/assets/imgs/1-1.png);
    background-repeat: no-repeat;
    background-size: 471.5px 166.75px
  }

  .left2 {
    background-image: url(~@/assets/imgs/1-2.png);
    background-repeat: no-repeat;
    background-size: 471.5px 166.75px
  }

  .left3 {
    background-image: url(~@/assets/imgs/1-3.png);
    background-repeat: no-repeat;
    background-size: 471.5px 166.75px
  }

  .left4 {
    background-image: url(~@/assets/imgs/1-4.png);
    background-repeat: no-repeat;
    background-size: 471.5px 166.75px
  }

  .left5 {
    background-image: url(~@/assets/imgs/1-4.png);
    background-repeat: no-repeat;
    background-size: 471.5px 166.75px
  }

  .right1 {
    background-image: url(~@/assets/imgs/1-1.png);
    background-repeat: no-repeat;
    background-size: 471.5px 200px
  }

  .right2 {
    background-image: url(~@/assets/imgs/1-2.png);
    background-repeat: no-repeat;
    background-size: 471.5px 200px
  }

  .right3 {
    background-image: url(~@/assets/imgs/1-3.png);
    background-repeat: no-repeat;
    background-size: 471.5px 200px
  }

  .right4 {
    background-image: url(~@/assets/imgs/1-4.png);
    background-repeat: no-repeat;
    background-size: 471.5px 200px
  }

  .right5 {
    background-image: url(~@/assets/imgs/1-4.png);
    background-repeat: no-repeat;
    background-size: 471.5px 200px
  }
.left10{

    cursor: pointer;

    p {
      width: 160px;
      text-align: center;
      letter-spacing: 5px;
      padding: 0px;
      margin-top: -42px;
      position: absolute;
      color: #39ffff;
     margin-left: 760px;
    }
}
  .zbcs {
    margin-left: 1.25rem;
    margin-top: 0.5rem;
    width: 4px;
    height: 18px;
    background: rgba(57, 255, 255, 0.39);
    opacity: 1;
  }

  .zwsj {
    width: 64px;
    position: relative;
    top: 20px;
    left: -80px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 27px;
    color: #FFFFFF;
    opacity: 1;
    text-align: center;
  }

  .nr {
    // border: 1px solid yellow;
    height: 59.375rem;
    // margin-top:10px;
    display: flex;

    .one {
      flex: 1;
      margin-left: 10px;
      // border: 1px solid blue;
      display: flex;
      flex-direction: column;

      div {
        // border: 1px solid #5F50E5;
      }
    }

    .two {
      flex: 2;
      // border: 1px solid blue;
    }

    .three {
      flex: 1;
      // border: 1px solid blue;
      display: flex;
      flex-direction: column;
      margin-right: 10px;

      div {
        // border: 1px solid #5F50E5;
      }
    }
  }
</style>