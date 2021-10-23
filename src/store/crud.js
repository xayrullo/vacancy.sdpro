import axiosInit from '../utils/axios-init'
import { camelize } from '../utils/tools'
export default function (param) {
  const toUpper = param.toUpperCase()
  const _mutations = {
    error: `ERROR_${toUpper}`,
    load: `LOAD_${toUpper}`,
    oneLoad: `ONE_LOAD_${toUpper}`,
    pending: `PENDING_${toUpper}`,
    deleting: `DELETING_${toUpper}`,
    data: `GET_${toUpper}`,
    pagination: `PAGINATION_${toUpper}`,
    removeOne: `REMOVE_ONE_${toUpper}`
  }
  return {
    state: {
      loading: false,
      oneLoading: false,
      pending: false,
      deleting: false,
      error: null,
      data: [],
      pagination: {
        page: 1,
        total: 0
      }
    },
    getters: {
      [camelize(`load ${param}`)]: function (state) { return state.loading },
      [camelize(`one load ${param}`)]: function (state) { return state.oneLoading },
      [camelize(`pending ${param}`)]: function (state) { return state.pending },
      [camelize(`deleting ${param}`)]: function (state) { return state.deleting },
      [camelize(`data ${param}`)]: function (state) { return state.data },
      [camelize(`error ${param}`)]: function (state) { return state.error },
      [camelize(`pagination ${param}`)]: function (state) { return state.pagination }
    },
    mutations: {
      [_mutations.error]: function (state, payload) { state.error = payload },
      [_mutations.data]: function (state, payload) { state.data = payload },
      [_mutations.load]: function (state, payload) { state.loading = payload },
      [_mutations.oneLoad]: function (state, payload) { state.oneLoading = payload },
      [_mutations.pending]: function (state, payload) { state.pending = payload },
      [_mutations.deleting]: function (state, payload) { state.deleting = payload },
      [_mutations.pagination]: function (state, payload) { state.pagination = payload },
      [_mutations.removeOne]: function (state, payload) { state.data.splice(payload, 1) }
    },
    actions: {
      // get    getSomething
      [camelize(`get ${param}`)]: function ({ commit }, payload) {
        commit(_mutations.load, true)
        return new Promise((resolve, reject) => {
          console.log(param);
          axiosInit.get(`${param}`, payload).then(res => {
            const _res = res.results || res
            commit(_mutations.data, _res)
            resolve(_res)
          }).catch(error => {
            commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.load, false)
          })
        })
      },

      // get id   getByIdSomething
      [camelize(`get by id ${param}`)]: function ({ commit }, payload) {
        commit(_mutations.oneLoad, true)
        return new Promise((resolve, reject) => {
          axiosInit.get(`${param}/${payload}/`).then(res => {
            resolve(res)
          }).catch(error => {
            commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.oneLoad, false)
          })
        })
      },

      // post   postSomething
      [camelize(`post ${param}`)]: function ({ commit, dispatch }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          axiosInit.post(`${param}/`, payload.data).then(res => {
            dispatch('success_alert', {
              title: `${param.slice(0, 1).toUpperCase() + param.slice(1)} created successfully`
            })
            resolve(res)
          }).catch(error => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      // update  putSomething
      [camelize(`put ${param}`)]: function ({ commit, dispatch }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          axiosInit.put(`${param}`, payload.data).then(res => {
            dispatch('success_alert', {
              title: `${param.slice(0, 1).toUpperCase() + param.slice(1)} updated successfully`
            })
            resolve(res)
          }).catch(error => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      // delete   deleteSomething
      [camelize(`delete ${param}`)]: function ({ commit, dispatch }, payload) {
        commit(_mutations.deleting, true)
        return new Promise((resolve, reject) => {
          axiosInit.remove(`${param}/${payload}`).then(res => {
            dispatch('success_alert', {
              title: `${param.slice(0, 1).toUpperCase() + param.slice(1)} deleted successfully`
            })
            resolve(res)
          }).catch(error => {
            // commit(_mutations.error, error)
            reject(error)
          }).finally(() => {
            commit(_mutations.deleting, false)
          })
        })
      }
    }
  }
}
