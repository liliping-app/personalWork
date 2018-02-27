// require('./style.scss');

// document.querySelector('#app').innerHTML = require('./tpl.html');

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/index.js';
import store from './store/';
import ajax from './config/ajax';
import './style/common.less';
import './config/rem';
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});

/* eslint-disable no-new */
new Vue({
    router,
    store,
}).$mount('#app');

// document.body.innerHTML += require('./tpl.html');
