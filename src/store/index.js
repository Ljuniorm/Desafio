import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infos:{
      forecast: null,
      celsius: null,
      days:null,
      alerts:null,
      current:null,
      options: [],
      nameCity: ''
    }
  },
  mutations: {
    updateInfos(state, payload){
      state.infos.forecast = payload && payload.forecast
      state.infos.celsius = payload && payload.celsius
      state.infos.days = payload && payload.days
      state.infos.alerts = payload && payload.alerts
      state.infos.current = payload && payload.current
    },

    

    updateCurrentAndCelsius(state, payload){
      state.infos.current = payload && payload.current
      state.infos.celsius = payload && payload.celsius
    },

    updateOptions(state, payload){
      state.infos.options.push(payload)
    },
  },
  actions: {
  },
  modules: {
  }
})
