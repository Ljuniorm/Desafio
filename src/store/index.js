import Vue from 'vue'
import Vuex from 'vuex'
import infos from './modules/infos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    infos
  }
})
