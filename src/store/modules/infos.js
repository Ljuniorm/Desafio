import { UPDATE_INFO,UPDATE_CURRENT_CELSIUS } from "../mutationTypes";

const state = {
    forecast: null,
    celsius: null,
    days:null,
    alerts:null,
    current:null,
    nameCity: ''
};

const mutations = {
    [UPDATE_INFO](state, payload){
        state.forecast = payload && payload.forecast
        state.celsius = payload && payload.celsius
        state.days = payload && payload.days
        state.alerts = payload && payload.alerts
        state.current = payload && payload.current
    },
  
      
  
    [UPDATE_CURRENT_CELSIUS](state, payload){
        state.current = payload && payload.current
        state.celsius = payload && payload.celsius
    },
};

export default {
  state,
  mutations,
};
