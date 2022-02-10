import { http, httpFile } from './http.service'

export const indexProductos = function(page, limit){
    return http().get(`/producto?page=${page}&limit=${limit}`);
}

export const storeProducto = function(producto){
    let formData = new FormData;
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("stock", producto.stock);
    formData.append("descricion", producto.descripcion);
    formData.append("categoria_id", producto.categoria_id);
    formData.append("estado", producto.estado);
    if(producto.imagen){
        formData.append("imagen", producto.imagen);
    }


    return http().post(`/producto`, formData);
}

export const showProducto = function(id){
    return http().get(`/producto/${id}`);
}

export const updateProducto = function(id, producto){
    return http().put(`/producto/${id}`, producto);
}

export const destroyProducto = function(id){
    return http().delete(`/producto/${id}`);
}
