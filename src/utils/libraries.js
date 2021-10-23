import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'jquery/dist/jquery.min.js'
import vModal from 'vue-js-modal'
import { ValidationProvider, ValidationObserver, configure, extend } from 'vee-validate'
import { required, length, min } from 'vee-validate/dist/rules'
import * as rules from 'vee-validate/dist/rules'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

const options = {
  toast: {
    position: SnotifyPosition.rightCenter,
    showProgressBar: false,
    timeout: 3000,
    titleMaxLength: 100
  }
}
Vue.use(Snotify, options)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(vModal, {
  dynamic: true
})

configure({
  classes: {
    // valid: 'is-valid',
    // invalid: 'is-invalid',
    // dirty: 'is-dirty',
  }
})
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
extend('length', {
  ...length,
  message: 'Поле должно состоять из {length} чисел'
})

extend('min', {
  ...min,
  message: 'Поле должно быть не менее {length} символов'
})

extend('checkUnique', {
  validate: ({ checked }) => {
    return checked
  },
  message: 'AAAAAA'
})

extend('required', {
  ...required,
  message: 'Поле обязательно для заполнения'
})

extend('samePassword', {
  params: ['password'],
  validate: (value, { password }) => {
    return password === value
  },
  message: 'Пароли не совпадают'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('v-select', vSelect)
