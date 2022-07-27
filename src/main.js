/*
 * @Author: isbo isbooo@163.com
 * @Date: 2022-05-18 10:13:36
 * @LastEditors: isbo isbooo@163.com
 * @LastEditTime: 2022-06-10 15:34:17
 * @FilePath: \tgys - 副本\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import './assets/fonts/font.css'
// import $ from 'jquery'
//引入echart
//4.x 引用方式
// import echarts from 'echarts'
console.log(process.env)
// import './utils/rem'

//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
//引入element-ui的组件与样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
let base = process.env.NODE_ENV === 'production' ? 'https://weixin.baierinfo.com' : 'http://localhost:8080';

Vue.prototype.baseURL = base;
//引入地图组件
// import 'leaflet/dist/leaflet.css'
// import * as L from 'leaflet'
// Vue.prototype.$L = L
//通过Vue将其生效
// Vue.use($);

Vue.use(ElementUI);
// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');