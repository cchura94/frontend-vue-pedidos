<template>
  <h1>Ingresar (Login)</h1>
  <label for="">Ingrese su Correo:</label>
  <input type="email" v-model="usuario.email">
  <br>
  <label for="">Ingrese su Password</label>
  <input type="password" v-model="usuario.password">
  <br>
  <button @click="ingresar()">INGRESAR</button>
  <hr>
  {{ usuario }}
</template>

<script>
import * as loginService from "./../../services/login.service"

export default {
    data(){
        return {
            usuario: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async ingresar(){
            const {data}= await loginService.login(this.usuario)
            if(!data.error){
                console.log(data);
                let base64 = Buffer.from(data.access_token).toString('base64');
                // return Buffer.from(data, 'base64').toString('ascii');
                localStorage.setItem("token",base64)

            }

        }
    }
    

}
</script>

<style>

</style>