import { createStore } from 'vuex'

export default createStore({
  state: {
    mensaje: 'Hola Mundo desde Vuex',
    user: JSON.parse(localStorage.getItem("user")) || null
  },
  mutations: {
    cambioMensaje(state, val){
      state.mensaje = val
    },
    actualizarUser(state, user){
      state.user = user
    }

  },
  actions: {
    changeMensaje(context, v){
      context.commit("cambioMensaje", v)
    },
    cambiarUsuario(context, u){
      context.commit("actualizarUser", u)
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
