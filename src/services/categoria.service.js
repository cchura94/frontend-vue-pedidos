import { http, httpFile } from './http.service'

export const indexCategorias = function(){
    return http().get(`/categoria`);
}

export const storeCategoria = function(categoria){
    return http().post(`/categoria`, categoria);
}

export const showCategoria = function(id){
    return http().get(`/categoria/${id}`);
}

export const updateCategoria = function(id, categoria){
    return http().put(`/categoria/${id}`, categoria);
}

export const destroyCategoria = function(id){
    return http().delete(`/categoria/${id}`);
}
