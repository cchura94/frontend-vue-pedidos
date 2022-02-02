<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { indexCategorias } from "./../services/categoria.service"

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async mounted(){
    const {data} = await indexCategorias();
    console.log(data);
  }
}
</script>
