import { http, httpFile } from './http.service'

export function login(datos) {
    return http().post('/login', datos);
}

/*
export const subirImagen = function(img) {
    return httpFile().post('/upload', img);
}

export const login3 = () => {

}

*/