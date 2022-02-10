<template>
    <div class="card">
        <h1>Lista Pedidos</h1>
        <h2>{{ $store.state.mensaje }}</h2>
        <h3>{{ $store.getters.getMensaje }}</h3>
        <hr>
        <input type="text" v-model="msg">
        <button @click="cambiarMensaje()">Cambiar Mensaje</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg: ""
        }
    },
    methods:{
        cambiarMensaje(){
            this.$store.dispatch("changeMensaje", this.msg)
        }
    }
}
</script>