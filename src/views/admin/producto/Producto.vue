<template>

<div>
        <div class="card">
  
  <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

  <DataTable :lazy="true" :totalRecords="totalRecords" :loading="loading" @page="onPage($event)" ref="dt" :value="productos" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="5" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Gestión Productos</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="ID" :sortable="true" style="min-width:12rem"></Column>
                <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
                <Column header="Imagen">
                     <template #body="slotProps">
                        <img v-if="slotProps.data.imagen && slotProps.data.imagen!=='/imagenes'" :src="`http://127.0.0.1:8000${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="product-image" />
                    </template>
                </Column>
                <Column field="precio" header="Precio" :sortable="true" style="min-width:8rem">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.precio)}}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" :sortable="true" style="min-width:10rem"></Column>
                <!--Column field="rating" header="Reviews" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                       <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column-->
                <!--Column field="inventoryStatus" header="Status" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{slotProps.data.inventoryStatus}}</span>
                    </template>
                </Column-->
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
          </div>



          <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <img :src="`https://127.0.0.1:8000/${producto.imagen}`" :alt="producto.imagen" class="product-image" v-if="producto.imagen" />
            <div class="field">
                <label for="name">Nombre Producto</label>
                <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus :class="{'p-invalid': submitted && !producto.nombre}" />
                <small class="p-error" v-if="submitted && !producto.nombre">El nombre es obligatorio.</small>
            </div>
            <div class="field">
                <label for="img">Imagen</label>
                <!--FileUpload name="imagen" @change="onImagenSeleccionada" @upload="onUpload" :multiple="false" accept="image/*" :maxFileSize="1000000" v-model="producto.imagen">
                    <template #empty>
                        <p>Arrastra y suelte la imagen.</p>
                    </template>
                </FileUpload-->
                <input type="file" @change="onImagenSeleccionada" />
            </div>
            <div class="field">
                <label for="description">Descripción</label>
                <Textarea id="description" v-model="producto.descripcion" rows="2" cols="20" />
            </div>

            <div class="field">
				<label for="inventoryStatus" class="mb-3">Estado</label>
				<Dropdown id="inventoryStatus" v-model="producto.estado" :options="statuses" optionLabel="label" placeholder="Seleccionar estado">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>

            <div class="field">
                <label class="mb-3">Categorias</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6" v-for="(cate, index) in categorias" :key="index">
                        <RadioButton id="category1" name="category" :value="cate.id" v-model="producto.categoria_id" />
                        <label for="category1">{{ cate.nombre }}</label>
                    </div>
                </div>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Precio</label>
                    <InputNumber id="price" v-model="producto.precio" mode="currency" currency="USD" locale="en-US" />
                </div>
                <div class="field col">
                    <label for="quantity">Cantidad</label>
                    <InputNumber id="quantity" v-model="producto.stock" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
            {{ producto }}
        </Dialog>

      </div>
      <Toast position="top-right" />

</template>

<script>
import * as productoService from "./../../../services/producto.service"
import * as apiCategoria from "./../../../services/categoria.service"
import { FilterMatchMode } from 'primevue/api';

export default {
  data() {
    return {
      categorias: [],
      productos: null,
      producto: {},
      selectedProducts: null,
      filters: {},
      productDialog: false,
      submitted: false,
      statuses: [
				{label: 'ACTIVO', value: 1},
				{label: 'INACTIVO', value: 0}
      ],
      totalRecords: 0,
      loading: false,
      lazyParams: {},
      imagenSeleccionada: null
    }
  },
  created(){
     this.initFilters();
  },
  async mounted() {
       this.loading = true;

        this.lazyParams = {
            first: 0,
            rows: this.$refs.dt.rows,
            sortField: null,
            sortOrder: null,
            filters: this.filters
        };
    // this.$toast.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 3000});
    // categorias
    try{
        const datacategorias = await apiCategoria.indexCategorias();
        this.categorias = datacategorias.data
    }catch(error){
        console.log(error.response.status);
        if(error.response.status == 401){
            this.$router.push({ name: "Login"})
        }
    }
    // productos
    this.loadLazyData()
  },
  methods: {
    formatCurrency(value) {
      if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
    },
    onPage(event) {
            this.lazyParams = event;
            this.loadLazyData();
        },
    loadLazyData() {
            this.loading = true;
            
            console.log(this.lazyParams)

            this.listarProductos(this.lazyParams.page + 1, this.lazyParams.rows);
    },
    async listarProductos(page, limit){
        const {data} = await productoService.indexProductos(page, limit);
        console.log(data.data)
        this.productos = data.data
        this.totalRecords = data.total

        this.loading = false;
    },
    openNew() {
        this.producto = {};
        this.submitted = false;
        this.productDialog = true;
    },
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    },
    async saveProduct() {
            this.submitted = true;

			if (this.producto.nombre.trim()) {
                if (this.producto.id) {
                    this.producto.inventoryStatus = this.producto.inventoryStatus.value ? this.producto.inventoryStatus.value: this.producto.inventoryStatus;
                    this.products[this.findIndexById(this.producto.id)] = this.producto;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    // this.producto.id = this.createId();
                    // this.producto.code = this.createId();
                    // this.producto.image = 'product-placeholder.svg';
                    this.producto.estado = this.producto.estado.value;
                    await productoService.storeProducto(this.producto)
                    this.productos.push(this.producto);
                    this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Producto Registrado', life: 3000});
                }

                this.productDialog = false;
                this.producto = {};
            }
        },

        onImagenSeleccionada(event){
            console.log(event.target.files[0])
            this.producto.imagen = event.target.files[0]

        },

        exportCSV() {
            this.$refs.dt.exportCSV();
        },

    initFilters() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    }
  }

}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>