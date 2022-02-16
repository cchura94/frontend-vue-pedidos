import { http, httpFile } from './http.service'

export const indexCliente = function(id_ci_nit){
    return http().get(`/cliente?search=${id_ci_nit}`);
}

export const storeCliente = function(categoria){
    return http().post(`/cliente`, categoria);
}

export const showCliente = function(id){
    return http().get(`/cliente/${id}`);
}

export const updateCliente = function(id, categoria){
    return http().put(`/cliente/${id}`, categoria);
}

export const destroyCliente = function(id){
    return http().delete(`/cliente/${id}`);
}
