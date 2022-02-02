import axios from 'axios'

export function http(){
    return axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer 19|LOcqVO0wy0r9k3XDuaf3h3Jx7zVejioB59Jzm7gM'
        }
    })
}

export function httpFile(){
    return axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    })
}
