import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infos:{
      forecast: null,
      geolocation:null,
      celsius: null,
      days:null,
      alerts:null,
      current:null,
    }
  },
  mutations: {
    updateInfos(state, payload){
      state.infos.forecast = payload && payload.forecast
      state.infos.geolocation = payload && payload.geolocation
      state.infos.celsius = payload && payload.celsius
      state.infos.days = payload && payload.days
      // state.infos.days.shift()
      state.infos.alerts = payload && payload.alerts
      state.infos.current = payload && payload.current
    },

    updateCurrentAndCelsius(state, payload){
      state.infos.current = payload && payload.current
      state.infos.celsius = payload && payload.celsius
    },
  },
  actions: {
  },
  modules: {
  }
})
