<template>
<div class="grid">
    <div class="col-12 md:col-12 lg:col-12">
        <div class="card">
            <h5>USUARIO: {{ $store.state.user.email }}</h5>
            <h5>COD: {{ $store.state.user.id }}</h5>

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
                        <Button class="p-button-rounded p-button-sm" @click="incrementar(slotProps.data)" >+</Button> 
                        {{ slotProps.data.cantidad }}   
                        <Button class="p-button-rounded p-button-sm p-button-success mr-2" @click="decrementar(slotProps.data)" >-</Button>    
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
                    <h3>CLIENTE</h3>
                    <h5>Cliente: {{ data_cliente.nombre_completo }}</h5>
                    <h5>CI/NIT:{{ data_cliente.ci_nit }} </h5>
                    <h5>TELEFONO: {{ data_cliente.telefono }}</h5>

                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        
                        <InputText type="text" v-model="identificacion" placeholder="Buscar por CI/NIT" @keyup="buscarCliente" />
                        <Button label="Nuevo" icon="pi pi-external-link" @click="openBasic" />
        
                        <DataTable :value="clientes" responsiveLayout="scroll">
                            <Column field="nombre_completo" header="NOM"></Column>
                            <Column field="ci_nit" header="CI/NIT"></Column>
                            <Column field="telefono" header="TEL"></Column>
                            <Column field="accion" header="ACCION">
                                <template #body="slotProps">
                                    <Button label="" icon="pi pi-external-link" @click="seleccionarCliente(slotProps.data)" />
        
                                </template>
                            </Column>
                        </DataTable>
                    </span>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <label for="">COD FACTURA:</label>
                    <InputText type="text" v-model="cod_factura" placeholder="COD FACTURA" />
                        
                    
                    <Button label="Realizar Pedido" @click="completarPedido" />
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

  <Dialog header="Nuevo Cliente" v-model:visible="displayBasic" :style="{width: '40vw'}">
            <div class="grid p-fluid">
            <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Nombre completo" v-model="cliente.nombre_completo" />
                </div>
            </div>

            <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                    <InputText placeholder="Ci / NIT" v-model="cliente.ci_nit" />
                </div>
            </div>
            <div class="col-12 md:col-12">
                <div class="p-inputgroup">
                    <InputText placeholder="Telefono" v-model="cliente.telefono" />
                </div>
            </div>
            </div>
            
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarCliente()" autofocus />
            </template>
        </Dialog>
</template>

<script>
// composition api
import { ref, onMounted, computed  } from 'vue'
import * as productoService from './../../../services/producto.service'
import * as clienteService from './../../../services/cliente.service'
import * as pedidoService from './../../../services/pedido.service'

export default {
    setup(){
        onMounted(async () => {
            const {data} = await productoService.indexProductos(1, 10);
            productos.value = data.data
        })

        const productos = ref();
        const carrito = ref([]);
        const identificacion = ref()
        const displayBasic = ref(false);

        const titulo = "Composition api";
        const contador = ref(0);
        const clientes = ref([]);
        const cliente = ref({})
        const data_cliente = ref({})
        const cod_factura = ref(0);
        /*
        const buscarCi = computed(() => {
            return identificacion +"modificado";
        })
        */
        

        const openBasic = () => {
            displayBasic.value = true;
        };
        const closeBasic = () => {
            displayBasic.value = false;
        };
        function aumentar(){
            contador.value++;
        }

        function seleccionarCliente(clie){
            console.log(clie)
            data_cliente.value = clie
        }

        async function buscarCliente(){
            const {data} = await clienteService.indexCliente(identificacion.value)
            clientes.value = data;
        }

        function addCarrito(prod){
            let c = {
                id: prod.id,
                nombre: prod.nombre,
                precio: prod.precio,
                cantidad: 1                
            }
            carrito.value.push(c)
        }

        function incrementar(prod){
            prod.cantidad++;

        }
        function decrementar(prod){
            prod.cantidad--;
        }
        async function guardarCliente(){
            try{
                const {data} = await clienteService.storeCliente(cliente.value);
                console.log(data)
                data_cliente.value = data.cliente
                this.closeBasic()

            }catch(error){
                console.log(error)
            }

        }

        async function completarPedido(){
            try{
                const ped= {
                    cod_factura: cod_factura.value,
                    cliente_id: data_cliente.value.id,
                    productos: []
                }
                carrito.value.forEach(prod => {
                    ped.productos.push({
                        producto_id: prod.id,
                        cantidad: prod.cantidad
                    })                
                });
    
                const {data} = await pedidoService.storePedido(ped);
                console.log(data)
            }catch(error){
                console.log(error);
            }
        }

        return {
            titulo,
            contador,
            aumentar,
            productos,
            carrito,
            addCarrito,
            identificacion,
            clientes,
            buscarCliente,
            displayBasic,
            openBasic,
            closeBasic,
            cliente,
            guardarCliente,
            data_cliente,
            seleccionarCliente,
            cod_factura,
            completarPedido,
            incrementar,
            decrementar
        }
    }
}
</script>

<style>

</style>