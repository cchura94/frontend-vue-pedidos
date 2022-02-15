<template>
<div class="grid">
    <div class="col-12 md:col-12 lg:col-12">
        <div class="card">
            <h1>Datos Pedido</h1>
        </div>
    </div>
    <div class="col-12 md:col-8 lg:col-7">
        <div class="card">
            <h1>Lista Productos</h1>
            <DataTable :value="productos" responsiveLayout="scroll">
                <Column field="nombre" header="Nombre"></Column>
                <Column field="precio" header="Precio"></Column>
                <Column field="categoria.nombre" header="Categoria"></Column>
                <Column field="stock" header="Cantidad"></Column>
                <Column field="acciones" header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-caret-right" class="p-button-rounded p-button-success mr-2" @click="addCarrito(slotProps.data)" />    
                    </template>
                </Column>
                
            </DataTable>
        </div>
    </div>
    <div class="col-12 md:col-4 lg:col-5">
        <div class="grid">
            <div class="col-12">
<div class="card">
            <h1>Carrito</h1>
            <DataTable :value="carrito" responsiveLayout="scroll">
                <Column field="nombre" header="NOM"></Column>
                <Column field="precio" header="PRECIO"></Column>
                <Column field="cantidad" header="CANT">
                    <template #body="slotProps">
                        <Button class="p-button-rounded p-button-sm" @click="addCarrito(slotProps.data)" >+</Button> 
                        {{ slotProps.data.cantidad }}   
                        <Button class="p-button-rounded p-button-sm p-button-success mr-2" @click="addCarrito(slotProps.data)" >-</Button>    
                    </template>
                </Column>
                <Column field="subt" header="SUB.T">
                    <template #body="slotProps">
                        {{ slotProps.data.precio * slotProps.data.cantidad }}
                    </template>
                </Column>
            </DataTable>
            
        </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <h1>Cliente</h1>
                </div>
            </div>
        </div>
        
    </div>
</div>
  <div class="card">
      <h1>Nuevo Pedido</h1>
      <h2>{{ $store.state.mensaje }}</h2>
      <h2>{{ titulo }}</h2>
      <h2>{{ contador }}</h2>
      <button @click="aumentar">+</button>
  </div>
</template>

<script>
// composition api
import { ref, onMounted  } from 'vue'
import * as productoService from './../../../services/producto.service'

export default {
    setup(){
        onMounted(async () => {
            const {data} = await productoService.indexProductos(1, 10);
            productos.value = data.data
        })

        const productos = ref();
        const carrito = ref([])

        const titulo = "Composition api";
        const contador = ref(0);
        

        function aumentar(){
            contador.value++;
        }

        function addCarrito(prod){
            let c = {
                nombre: prod.nombre,
                precio: prod.precio,
                cantidad: 1                
            }
            carrito.value.push(c)
        }

        return {
            titulo,
            contador,
            aumentar,
            productos,
            carrito,
            addCarrito
        }
    }
}
</script>

<style>

</style>