<template>
<div class="card">
  <h1>Categoria</h1>
  <Button label="Nueva Categoria" icon="pi pi-check" iconPos="right" routerLink="/categoria/nuevo" />
   <DataTable :value="categorias" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="detalle" header="Detalle"></Column>
            <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCategoria(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="eliminarDialogCategoria(slotProps.data)" />
                    </template>
                </Column>
    </DataTable>
    </div>
    <Dialog header="Header" v-model:visible="display" >
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
        <Button icon="pi pi-check" label="Guardar" @click="modificarCatgoria()" />
        <Button icon="pi pi-times" label="Cancelar" class="p-button-secondary" style="margin-left: .5em" />
    </template>
</Card>
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
</template>

<script>
import * as apiCategoria from "./../../../services/categoria.service"

export default {
    data(){
        return {
            categorias: [],
            display: false,
            displayEliminar: false,
            categoria: {}
        }
    },
    mounted(){
        this.listarCategoria()
    },
    methods: {
        async listarCategoria(){
            const {data} = await apiCategoria.indexCategorias();
            this.categorias = data
        },
        editCategoria(data){
            this.display = true
            this.categoria = data
        },
        async modificarCatgoria(){
            await apiCategoria.updateCategoria(this.categoria.id, this.categoria)
        },
        eliminarDialogCategoria(data){
            this.$confirm.require({
                message: 'Esta seguro de eliminar la categoria?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    //callback to execute when user confirms the action
                    this.eliminarCategoria(data.id)
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        },

        async eliminarCategoria(id){
            await apiCategoria.destroyCategoria(id);
            this.listarCategoria()

        }
    }

}
</script>

<style>

</style>