import Vue from 'vue'
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    alert (payload) {
      const { title, message } = payload
      Vue.prototype.$snotify.info(`${title}: ${message}`)
    },
    success_alert (payload) {
      const { title, message } = payload
      Vue.prototype.$snotify.success(`${title}: ${message}`)
    },
    error_alert (payload) {
      const { title, message } = payload
      Vue.prototype.$snotify.error(`${title}: ${message}`)
    },
    warning_alert (payload) {
      const { title, message } = payload
      Vue.prototype.$snotify.warning(`${title}: ${message}`)
    },
    info_alert (payload) {
      const { title, message } = payload
      Vue.prototype.$snotify.info(`${title}: ${message}`)
    }
  }
}
