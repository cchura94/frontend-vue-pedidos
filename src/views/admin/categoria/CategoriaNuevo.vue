<template>

  <Card>
    <template #title>
        Nueva Categoria
    </template>
    <template #content>
      <span class="p-float-label">
        <InputText id="nombre" type="text" v-model="categoria.nombre" />
        <label for="nombre">Ingrese Nombre</label>
      </span>
      <Textarea v-model="categoria.detalle" rows="5" cols="30" />

    </template>
    <template #footer>
        <Button icon="pi pi-check" label="Guardar" @click="guardarCategoria()" />
        <Button icon="pi pi-times" label="Cancelar" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
{{ categoria }}
 
</template>

<script>
import * as apiCategoria from "./../../../services/categoria.service"
import { defineComponent } from "vue";
import { useToast } from "primevue/usetoast";

export default {
  data(){
    return {
      categoria: {
        nombre: '',
        detalle: ''
      }
    }
  },
  mounted() {
        this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
    },
  methods: {
    async guardarCategoria(){
      try{
        await apiCategoria.storeCategoria(this.categoria);
        this.$router.push({name: 'Categoria'})
        this.$toast.add({severity:'success', summary: 'Categoria Registrada', detail:'Order submitted', life: 3000});
      }catch(error){
        this.$toast.add({severity:'danger', summary: 'ERROR', detail:'Order submitted', life: 3000});
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