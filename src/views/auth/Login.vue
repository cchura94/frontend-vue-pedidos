<template>
<div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido <span v-if="$store.state.user != null">{{ $store.state.user.email }}</span> !</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="usuario.email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="INGRESAR" class="w-full p-3 text-xl" @click="ingresar()"></button>
                    </div>
                </div>
            </div>
        </div>
        <Toast position="bottom-center" group="bc">
            <template #message="slotProps">
                <div class="flex flex-column">
                    <div class="text-center">
                        <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
                        <h4>{{slotProps.message.summary}}</h4>
                        <p>{{slotProps.message.detail}}</p>
                    </div>
                    <div class="grid p-fluid">
                        <div class="col-6">
                            <Button class="p-button-success" label="Yes" @click="onConfirm"></Button>
                        </div>
                        <div class="col-6">
                            <Button class="p-button-secondary" label="No" @click="onReject"></Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toast>
    </div>
    <Toast />
<Toast position="top-right" group="br" />
  {{ usuario }}
</template>

<script>
import * as loginService from "./../../services/login.service"
import { useToast } from "primevue/usetoast";

export default {
    data(){
        return {
            usuario: {
                email: '',
                password: ''
            },
            checked: false
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    },
    methods: {
        async ingresar(){
            const {data, error}= await loginService.login(this.usuario)
            if(!data.error){
                console.log(data);
                let base64 = Buffer.from(data.access_token).toString('base64');
                // return Buffer.from(data, 'base64').toString('ascii');
                localStorage.setItem("token",base64)
                localStorage.setItem("user", JSON.stringify(data.user))
                this.$store.dispatch("cambiarUsuario", data.user)
                this.$toast.add({severity:'success', summary: 'Bienvenido', detail:'Correcto', life: 3000});
                this.$router.push({ name: "Home"})
           
            }else{
                this.$toast.add({severity:'error', summary: 'Error de autenticación', detail:'Credenciales incorrectas', life: 3000});
            }

        }
    },
    setup() {
        const toast = useToast();
        toast.add({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
    }
    

}
</script>

<style>

</style>