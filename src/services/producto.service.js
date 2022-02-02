import { http, httpFile } from './http.service'

export const indexProductos = function(){
    return http().get(`/producto`);
}

export const storeProducto = function(producto){
    return http().post(`/producto`, producto);
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
