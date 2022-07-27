<template>
    <div>

        <div style="display:flex">
            <div class="meterhistory">24小时用电量</div>
            <div style="color:#FFFFFF;line-height:40px;margin-left: 80px;">查询日期:
                <el-date-picker :clearable="false" v-model="value1" @change="sz()" type="date" :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="meterhistory" style="margin-left:1300px">实时电流</div>



            <!-- <span class="zq">统计周期</span>
            <el-select style="margin-top:5px;margin-top:5px;margin-left:10px" v-model="value" placeholder="12小时">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->

        </div>


        <div class="nr">

            <div class="left">
                <div class="left1" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">总表</span>
                        <span class="wzz">单位:kW·h</span>
                    </div>
                    <brokenLine id="one" class="myone"></brokenLine>
                </div>
                <div class="left2" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">空调</span>
                        <span class="wzz">单位:kW·h</span>
                    </div>
                    <brokenLine id="two" class="myone"></brokenLine>
                </div>
                <div class="left3" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">照明</span>
                        <span class="wzz">单位:kW·h</span>
                    </div>
                    <brokenLine id="three" class="myone"></brokenLine>
                </div>
            </div>
            <div class="right">
                <p style="font-size: 22px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                line-height: 54px;
                color: #00E7FE;
                margin-top: 85%;
                margin-left: 30px;
                ">当日用电总量：{{parseFloat(all).toFixed(1)}}kW·h</p>
            </div>
            <div class="left">
                <div class="left1" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">总表</span>
                        <span class="wzz">单位:A</span>
                    </div>
                    <brokenLine id="four" class="myone"></brokenLine>
                </div>
                <div class="left2" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">空调</span>
                        <span class="wzz">单位:A</span>
                    </div>
                    <brokenLine id="five" class="myone"></brokenLine>
                </div>
                <div class="left3" style="flex:1">
                    <div style="height:0px">
                        <div class="ysy"></div>
                        <span class="wz">照明</span>
                        <span class="wzz">单位:A</span>
                    </div>
                    <brokenLine id="six" class="myone"></brokenLine>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import brokenLine from "../components/echart/brokenLine/brokenline.vue";
    const url = 'https://weixin.baierinfo.com/app'
    // axios.defaults.baseURL = "https://weixin.baierinfo.com/app";
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

                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value1: '',
                shows: '',
                value: '',
                all: '',
                zonga: [],
                zongb: [],
                zongc: [],
                eledatas: [],
                eledatas1: [],
                eledatas2: [],
            }

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
            // this.shows=localStorage.getItem('shows')

            this.getFirstList()
            this.getFirstList1()
            this.getFirstList2()
            this.getFirstListza()

            this.getFirstListzkt()
            this.getFirstListzzm()
            this.drawBrokenLine();
            this.drawBrokenLinetwo();
            this.drawBrokenLinethree();
            this.drawBrokenLinefour();
            this.drawBrokenLinefive();
            this.drawBrokenLinesix();
            window.setInterval(() => {



                this.getFirstList()
                this.getFirstList1()
                this.getFirstList2()
                this.getFirstListza()

                this.getFirstListzkt()
                this.getFirstListzzm()
                this.drawBrokenLine();
                this.drawBrokenLinetwo();
                this.drawBrokenLinethree();
                this.drawBrokenLinefour();
                this.drawBrokenLinefive();
                this.drawBrokenLinesix();
            }, 300000);

        },

        methods: {
            sz() {
                // console.log(this.value1)
                this.getFirstList()
                this.getFirstList1()
                this.getFirstList2()
            },

            //总表请求
            getFirstList() {
                axios.get(
                        `${url}/getDataByDownsampleDate?sensornum=tgyy220401&type=ele_ee&downsample=1h&startTime=` +
                        this.value1 + ` 00:00:01&endTime=` + this.value1 + ` 24:00:00&model=max`,
                    )
                    .then((res) => {
                        if (res.data.data.data) {
                            // console.log(res.data.data.data)
                            //  = res.data.data.data
                            let shuzu = eval('(' + res.data.data.data + ')').reverse();
                            // console.log(shuzu);
                            this.eledatas=[]
                            for (var i = 0; i < shuzu.length - 1; i++) {

                                this.eledatas.push([shuzu[i][0], shuzu[i + 1][1] - shuzu[i][1]])


                                this.all = ((shuzu[shuzu.length - 1][1]) - (shuzu[0][1]))
                            }
                            // console.info(this.eledatas)






                            this.drawBrokenLine(this.eledatas)
                        } else {
                            this.drawBrokenLine()
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //空调请求
            getFirstList1() {
                axios.get(
                        `${url}/getDataByDownsampleDate?sensornum=tgyy220402&type=ele_ee&downsample=1h&startTime=` +
                        this.value1 + ` 00:00:01&endTime=` + this.value1 + ` 24:00:00&model=max`,
                    )
                    .then((res) => {
                        let shuzu1 = eval('(' + res.data.data.data + ')').reverse();
                        // console.log(shuzu1);
                        this.eledatas1=[]
                        for (var i = 0; i < shuzu1.length - 1; i++) {

                            this.eledatas1.push([shuzu1[i][0], shuzu1[i + 1][1] - shuzu1[i][1]])
                        }
                        // console.info(this.eledatas1)
                        if (res.data.data.data) {
                            this.drawBrokenLinetwo(this.eledatas1)
                        } else {
                            this.drawBrokenLinetwo()
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //照明请求
            getFirstList2() {
                axios.get(
                        `${url}/getDataByDownsampleDate?sensornum=tgyy220403&type=ele_ee&downsample=1h&startTime=` +
                        this.value1 + ` 00:00:01&endTime=` + this.value1 + ` 24:00:00&model=max`,
                    )
                    .then((res) => {
                        let shuzu2 = eval('(' + res.data.data.data + ')').reverse();
                        // console.log(shuzu2);
                        this.eledatas2=[]
                        for (var i = 0; i < shuzu2.length - 1; i++) {

                            this.eledatas2.push([shuzu2[i][0], shuzu2[i + 1][1] - shuzu2[i][1]])
                        }
                        // console.info(this.eledatas2)
                        if (res.data.data.data) {
                            this.drawBrokenLinethree(this.eledatas2)
                        } else {
                            this.drawBrokenLinethree()
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //总表请求
            getFirstListza() {
                axios.get(
                        `${url}/getEnvironData?sensornum=tgyy220401&equipmentId=5`,
                    )
                    .then((res) => {
                        // console.log(res.data.list,'1111')
                        // let shuzu2 = eval('(' + res.data.data.data + ')').reverse();
                        // // console.log(shuzu2);
                        // for (var i = 0; i < shuzu2.length - 1; i++) {

                        //     this.eledatas2.push([shuzu2[i][0], shuzu2[i + 1][1] - shuzu2[i][1]])
                        // }
                        // console.info(this.eledatas2)
                        if (res.data.list) {
                            this.zonga = (res.data.list[4].sensorDate)
                            this.zongb = (res.data.list[5].sensorDate)
                            this.zongc = (res.data.list[6].sensorDate)
                            this.drawBrokenLinefive(this.zonga, this.zongb, this.zongc)
                            // console.log(this.zonga, this.zongb, this.zongc)
                        } else {
                            this.zonga = (res.data.list[4].sensorDate)
                            this.zongb = (res.data.list[5].sensorDate)
                            this.zongc = (res.data.list[6].sensorDate)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            getFirstListzkt() {
                axios.get(
                        `${url}/getEnvironData?sensornum=tgyy220402&equipmentId=4`,
                    )
                    .then((res) => {
                        // let shuzu2 = eval('(' + res.data.data.data + ')').reverse();
                        // // console.log(shuzu2);
                        // for (var i = 0; i < shuzu2.length - 1; i++) {

                        //     this.eledatas2.push([shuzu2[i][0], shuzu2[i + 1][1] - shuzu2[i][1]])
                        // }
                        // console.info(this.eledatas2)

                        if (res.data.list[2].sensorDate) {

                            this.drawBrokenLinefour(parseFloat(res.data.list[2].sensorDate).toFixed(2))
                        } else {
                            this.drawBrokenLinefour(res.data.list[2].sensorDate)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },


            getFirstListzzm() {
                axios.get(
                        `${url}/getEnvironData?sensornum=tgyy220403&equipmentId=4`,
                    )
                    .then((res) => {
                        // let shuzu2 = eval('(' + res.data.data.data + ')').reverse();
                        // // console.log(shuzu2);
                        // for (var i = 0; i < shuzu2.length - 1; i++) {

                        //     this.eledatas2.push([shuzu2[i][0], shuzu2[i + 1][1] - shuzu2[i][1]])
                        // }
                        // console.info(this.eledatas2)

                        if (res.data.list[2].sensorDate) {
                            this.drawBrokenLinesix(parseFloat(res.data.list[2].sensorDate).toFixed(2))
                        } else {
                            this.drawBrokenLinesix(res.data.list[2].sensorDate)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },



            drawBrokenLine(data1) {
                var myChart = this.$echarts.init(document.getElementById("one"));
                var option = {

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
                            '总表用电量：' +
                            parseFloat(params[0].data[1]).toFixed(1) + 'kW·h'

                        "</div>" +
                        "</div>";
                        return str

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
                                var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
                                    .getMinutes()
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
                        show: true,
                        position: 'left',
                        nameLocation: 'start',
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
                        type: "line",
                        smooth: true,
                        color: "#00E7FE",
                    }, ],
                };

                myChart.clear()
                myChart.setOption(option, true);
            },

            drawBrokenLinetwo(data2) {
                var myChart = this.$echarts.init(document.getElementById("two"));

                var option = {
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
                            '空调用电量：' +
                            parseFloat(params[0].data[1]).toFixed(1) + 'kW·h'

                        "</div>" +
                        "</div>";
                        return str

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
                                var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
                                    .getMinutes()
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
                    series: [{
                        data: eval(data2),
                        type: "line",
                        smooth: true,
                        color: "#00E7FE",
                    }, ],
                };
                myChart.clear()
                myChart.setOption(option, true);
            },
            drawBrokenLinethree(data3) {
                var myChart = this.$echarts.init(document.getElementById("three"));
                var option = {
                    xAxis: {
                        type: "time",

                        axisLabel: {
                            showMaxLabel: true,
                            formatter: function (cellValue) {
                                var date = new Date(cellValue)

                                var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                                var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date
                                    .getMinutes()
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
                            '照明用电量：' +
                            parseFloat(params[0].data[1]).toFixed(1) + 'kW·h'

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
                        data: eval(data3),
                        type: "line",
                        smooth: true,
                        color: "#00E7FE",
                    }, ],
                };
                myChart.clear()
          myChart.setOption(option, true);
            },


            drawBrokenLinefour(data1) {
                var myChart = this.$echarts.init(document.getElementById("five"));
                const gaugeData = [{
                        value: data1,
                        name: '空调电流',
                        title: {
                            offsetCenter: ['0%', '87%']
                        },
                        detail: {
                            offsetCenter: ['0%', '110%']
                        }
                    }

                ];

                var option = {

                    series: [{
                            type: 'gauge',
                            anchor: {

                                show: true,
                                showAbove: true,
                                size: 18,
                                itemStyle: {
                                    color: '#FAC858'
                                }
                            },
                            pointer: {
                                icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                                width: 8,
                                length: '80%',
                                offsetCenter: [0, '8%']
                            },
                            progress: {
                                show: true,
                                overlap: true,
                                roundCap: true,

                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#FFF'
                                }
                            },
                            min: 0,
                            max: 40, //设置刻度盘内数值区间
                            splitNumber: 4, //设置间隔区域的显示数量
                            axisLine: {
                                roundCap: true,
                                lineStyle: { // 属性lineStyle控制线条样式  

                                }

                            },
                            data: gaugeData,
                            title: {
                                fontSize: 14,
                                color: '#FFF'
                            },
                            detail: {
                                width: 40,
                                height: 14,
                                fontSize: 14,
                                color: '#fff',
                                backgroundColor: 'auto',
                                borderRadius: 3,
                                formatter: '{value}A'
                            }
                        }


                    ],
                };
                
                myChart.clear()
          myChart.setOption(option, true);

             
            },


            drawBrokenLinefive(data1, data2, data3) {
                var myChart = this.$echarts.init(document.getElementById("four"));
                const gaugeData = [{
                        value: data1,
                        name: 'A相电流',
                        title: {
                            offsetCenter: ['-80%', '87%']
                        },
                        detail: {
                            offsetCenter: ['-80%', '110%']
                        }
                    },
                    {
                        value: data2,
                        name: 'B相电流',
                        title: {
                            offsetCenter: ['0%', '87%']
                        },
                        detail: {
                            offsetCenter: ['0%', '110%']
                        }
                    },
                    {
                        value: data3,
                        name: 'C相电流',
                        title: {
                            offsetCenter: ['80%', '87%']
                        },
                        detail: {
                            offsetCenter: ['80%', '110%']
                        }
                    }
                ];

                var option = {

                    series: [{
                            type: 'gauge',
                            anchor: {

                                show: true,
                                showAbove: true,
                                size: 18,
                                itemStyle: {
                                    color: '#FAC858'
                                }
                            },
                            pointer: {
                                icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                                width: 3,
                                length: '80%',
                                offsetCenter: [0, '8%']
                            },
                            progress: {
                                show: true,
                                overlap: true,
                                roundCap: true,

                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#FFF'
                                }
                            },
                            min: 0,
                            max: 40, //设置刻度盘内数值区间
                            splitNumber: 4, //设置间隔区域的显示数量
                            axisLine: {
                                roundCap: true,
                                lineStyle: { // 属性lineStyle控制线条样式  

                                }

                            },
                            data: gaugeData,
                            title: {
                                fontSize: 14,
                                color: '#FFF'
                            },
                            detail: {
                                width: 40,
                                height: 14,
                                fontSize: 14,
                                color: '#fff',
                                backgroundColor: 'auto',
                                borderRadius: 3,
                                formatter: '{value}A'
                            }
                        }


                    ],
                };
                myChart.clear();
                myChart.setOption(option, true);
            },

            drawBrokenLinesix(data1) {
                var myChart = this.$echarts.init(document.getElementById("six"));
                const gaugeData = [{
                        value: data1,
                        name: '照明电流',
                        title: {
                            offsetCenter: ['0%', '87%']
                        },
                        detail: {
                            offsetCenter: ['0%', '110%']
                        }
                    },

                ];

                var option = {

                    series: [{
                            type: 'gauge',
                            anchor: {

                                show: true,
                                showAbove: true,
                                size: 18,
                                itemStyle: {
                                    color: '#FAC858'
                                }
                            },
                            pointer: {
                                icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                                width: 8,
                                length: '80%',
                                offsetCenter: [0, '8%']
                            },
                            progress: {
                                show: true,
                                overlap: true,
                                roundCap: true,

                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#FFF'
                                }
                            },
                            min: 0,
                            max: 40, //设置刻度盘内数值区间
                            splitNumber: 4, //设置间隔区域的显示数量
                            axisLine: {
                                roundCap: true,
                                lineStyle: { // 属性lineStyle控制线条样式  

                                }

                            },
                            data: gaugeData,
                            title: {
                                fontSize: 14,
                                color: '#FFF'
                            },
                            detail: {
                                width: 40,
                                height: 14,
                                fontSize: 14,
                                color: '#fff',
                                backgroundColor: 'auto',
                                borderRadius: 3,
                                formatter: '{value}A'
                            }
                        }


                    ],
                };
                myChart.clear()
                myChart.setOption(option, true);
            },


        }
    }
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    ::v-deep .el-input__inner {
        background-color: rgba(0, 162, 255, 0.04);
        height: 30px;
        color: #FFFFFF;
        width: 90px;
    }

    ::v-deep .el-input__icon {
        line-height: 0px;
    }

    ::v-deep.el-select-dropdown__item {
        background-color: rgba(0, 162, 255, 0.04);
    }

    .ysy {
        width: 4px;
        float: left;
        margin-left: 10px;
        margin-top: 6px;
        height: 18px;
        background: rgba(57, 255, 255, 0.39);
        opacity: 1;

    }

    .wz {
        width: 20px;
        height: 18px;
        margin-left: 10px;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 31px;
        color: #FFFFFF;
        opacity: 1;
    }

    .wzz {
        width: 100px;
        height: 18px;
        font-size: 18px;
        float: right;

        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 31px;
        color: #FFFFFF;
        opacity: 1;
    }

    .myone {
        height: 100%;
        width: 100%;

    }

    .left1 {
        background: url(../assets/imgs/31.png);
        background-repeat: no-repeat;
        background-position: center;
        margin: 10px;
    }

    .left2 {
        background: url(../assets/imgs/31.png);
        background-repeat: no-repeat;
        background-position: center;
        margin: 10px;
    }

    .left3 {
        background: url(../assets/imgs/31.png);
        background-repeat: no-repeat;
        background-position: center;
        margin: 10px;
    }

    .nr {
        display: flex;
        height: 55rem;

        .left {
            // border: 1px solid red;
            flex: 1;
            display: flex;
            flex-direction: column;

            div {
                flex: 1;
                // border: 1px solid red;
            }
        }

        .right {
            // border: 1px solid red;
            flex: 2;
            background: url(../assets/imgs/511.png);
            background-repeat: no-repeat;
            background-position: center;
        }
    }

    .zq {
        margin-left: 160px;
        width: 56px;
        height: 14px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 40px;
        color: #FFFFFF;
        opacity: 1;
    }

    ::v-deep .el-input__inner {
        width: 154px;
        height: 28px;
    }

    ::v-deep .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 160px;
    }

    .meterhistory {
        margin-left: 1.875rem;
        width: 96px;
        height: 16px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 33px;
        color: #FFFFFF;
        text-align: center;
        opacity: 1;
        width: 128px;
        height: 36px;
        background: rgba(0, 162, 255);
        opacity: 1;
        border-radius: 4px;
    }
</style>