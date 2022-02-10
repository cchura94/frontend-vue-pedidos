import axios from 'axios'
import { urlbase } from "./../config"
// import Router from "./../router"

export function http(){
    let token = "";
    try{
        let token64 = localStorage.getItem("token")
        token = Buffer.from(token64, 'base64').toString('ascii');
        
    }catch(error){
        
    }

    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });

    // verificar errores (401, 403)
    interceptor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // console.log(error);
            localStorage.clear();
            /*if(error.response.status === 401){
            }*/

            
            //router.push({name: 'Login'})

            return Promise.reject(error);
        }
    )
    return interceptor;
}

export function httpFile(){
    return axios.create({
        baseURL: urlbase,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    })
}
