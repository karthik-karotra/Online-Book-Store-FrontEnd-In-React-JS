import Axios from 'axios';
import URL from '../config/UrlConstant';

function post(data, url) {
    return Axios({
        method: 'post', headers: {"Content-Type": "application/json"},
        url: `${URL.apiURL}${url}`,
        data: data
    })
}

function get(url) {
    return Axios({
        method: 'get', headers: {"Content-Type": "application/json"},
        url: `${URL.apiURL}${url}`
    })
}

function deleteData(url) {
    return Axios({
        method: 'delete', headers: { 'token': localStorage.getItem('token') },
        url: `${URL.apiURL}${url}`,
    })
}

function update(url) {
    return Axios({
        method: 'put', headers: {"Content-Type": "application/json"},
        url: `${URL.apiURL}${url}`,
    })
}

export {post, get, deleteData, update}