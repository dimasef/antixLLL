

import './assets/scss/main.scss'
import babelPolyfill from 'babel-polyfill'

window.Vue = require('vue');

import store from './js/store'

Vue.component('tasks', require('./js/components/BaseTask.vue').default)

const app = new Vue({
    store,
    el: '#app'
})