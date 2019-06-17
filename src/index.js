
import './js/config'
import './scss/main.scss'

window.Vue = require('vue');

Vue.component('example-component', require('./js/components/Example.vue').default)

const app = new Vue({
    el: '#app'
})