import axios from 'axios'
import store from '../store'
import router from '../router'
const token = localStorage.getItem('token')

function unauthorized(msg) {
  errorNotification('unauthorized', msg)
  store.dispatch('signOut').then(() => {
    router.push({ name: 'login' })
  })
}

function errorNotification(title, msg) {
  store.dispatch('error_alert', {
    title: title,
    message: msg
  })
}

function ErrorHandler(error) {
  if (error.message.startsWith('timeout')) {
    errorNotification('timeout')
  }
  if (error.response) {
    const _error = error.response.data
    switch (error.response.status) {
      case 400:
        errorNotification('bad_request', _error)
        break
      case 401:
        unauthorized(_error)
        break
      case 403:
        errorNotification('forbidden', _error.message)
        break
      case 404:
        errorNotification('not_found', _error.message)
        break
      case 422:
        errorNotification('unprocessable_entity', _error.message)
        break
      case 500:
        errorNotification('internal_server_error', _error.message)
        break
      default:
        break
    }
  }
}

const init = {
  request(method, url, params, data) {
    const config = {
      baseURL: process.env.VUE_APP_BASE_URL,
      timeout: 120000,
      url: url,
      method: method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      },
      onUploadProgress: function (e) {
        Math.round((e.loaded * 100) / e.total)
      }
    }
    if (token || store.getters.token) {
      config.headers = {
        Authorization: 'Bearer ' + (token || store.getters.token)
      }
    }
    if (data) config.data = data

    if (params) config.params = params

    const result = axios(config)

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          ErrorHandler(error)
          reject(error)
        })
    })
  },
  get(url, params) {
    return this.request('GET', url, params, undefined)
  },
  post(url, data, params) {
    return this.request('POST', url, params, data)
  },
  patch(url, data, params) {
    return this.request('PATCH', url, params, data)
  },
  put(url, data, params) {
    return this.request('PUT', url, params, data)
  },
  remove(url, params) {
    return this.request('DELETE', url, params, undefined)
  }
}

export default init
