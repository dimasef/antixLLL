
import './js/config'
import './scss/main.scss'

window.Vue = require('vue');

import store from './js/store'

Vue.component('example-component', require('./js/components/Example.vue').default)

const app = new Vue({
    store,
    el: '#app'
})