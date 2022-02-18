<template>
    <div class="card">
        <h1>Lista Pedidos</h1>
        <h2>{{ $store.state.mensaje }}</h2>
        <h3>{{ $store.getters.getMensaje }}</h3>
        <hr>
        <input type="text" v-model="msg">
        <button @click="cambiarMensaje()">Cambiar Mensaje</button>

        <hr/>

        <DataTable :value="pedidos" responsiveLayout="scroll">
                <Column field="cod_factura" header="COD FACTURA"></Column>
                <Column field="cliente_id" header="Cliente"></Column>
                <Column field="mostrar" header="Mostrar Productos">
                    <template #body="slotProps">
                        <Button label="Mostrar" icon="pi pi-caret-right" class="p-button-rounded p-button-success mr-2" @click="mostrarPedido(slotProps.data)" />    
                    </template>
                </Column>
                <Column field="user_id" header="ATENDIDO POR"></Column>
                <Column field="acciones" header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-caret-right" class="p-button-rounded p-button-success mr-2" @click="addCarrito(slotProps.data)" />    
                    </template>
                </Column>
                
            </DataTable>
    </div>

<Dialog header="Detalle de Pedido" v-model:visible="displayBasic" :style="{width: '50vw'}">
            <div v-if="data_pedido">
                <Fieldset legend="Datos Cliente" :toggleable="true">
                    <h5>Nombre Cliente: {{ data_pedido.cliente.nombre_completo }}</h5>
                    <strong>Ci / Nit: {{ data_pedido.cliente.ci_nit }}</strong>
                    <strong>Telefono: {{ data_pedido.cliente.telefono }}</strong>
                </Fieldset>
                <Fieldset legend="Atendido Por" :toggleable="true">
                    <h5>Correo: {{ data_pedido.user.email }}</h5>
                    <strong>Nombre: {{ data_pedido.user.name }}</strong>
                </Fieldset>
                <Fieldset legend="Productos Comprados" :toggleable="true">
                    <DataTable :value="data_pedido.productos" responsiveLayout="scroll">
                        <Column field="id" header="ID"></Column>
                        <Column field="nombre" header="Nombre"></Column>
                        <Column field="pivot.cantidad" header="Cantidad">
                        </Column>
                        <Column field="precio" header="Precio"></Column>
                        
                    </DataTable>
                </Fieldset>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" @click="closeBasic" autofocus />
            </template>
        </Dialog>
</template>
<script>
import { ref, onMounted, computed  } from 'vue'
import * as pedidoService from './../../../services/pedido.service'
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
    },
    setup(){
        const pedidos = ref([])
        const data_pedido = ref(null)
        const displayBasic = ref(false);

        const openBasic = () => {
            displayBasic.value = true;
        };
        const closeBasic = () => {
            displayBasic.value = false;
        };

        onMounted(async () => {
            const {data} = await pedidoService.indexPedido();
            pedidos.value = data.data
        })

        async function mostrarPedido(pedido){
            const {data} = await pedidoService.showPedido(pedido.id);
            data_pedido.value = data

            this.openBasic()
            
        }

        return {
            pedidos,
            data_pedido,
            displayBasic,
            openBasic,
            closeBasic,
            mostrarPedido
        }
    }
}
</script>