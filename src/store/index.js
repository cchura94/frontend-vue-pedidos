import { createStore } from 'vuex'

export default createStore({
  state: {
    mensaje: 'Hola Mundo desde Vuex'
  },
  mutations: {
    cambioMensaje(state, val){
      state.mensaje = val
    }

  },
  actions: {
    changeMensaje(context, v){
      context.commit("cambioMensaje", v)

    }
  },
  getters: {
    getMensaje(state){
      return state.mensaje;
    }
  },
  modules: {
  }
})
