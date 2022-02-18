import { http, httpFile } from './http.service'

export const indexPedido = function(){
    return http().get(`/pedido`);
}

export const storePedido = function(pedido){
    return http().post(`/pedido`, pedido);
}

export const showPedido = function(id){
    return http().get(`/pedido/${id}`);
}

export const updatePedido = function(id, pedido){
    return http().put(`/pedido/${id}`, pedido);
}

export const destroyPedido = function(id){
    return http().delete(`/pedido/${id}`);
}
