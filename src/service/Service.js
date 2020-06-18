import Axios from 'axios';
import URL from '../config/UrlConstant';

function post(data, url) {
    return Axios({
        method: 'post', headers: {'token': localStorage.getItem('token')},
        url: `${URL.apiURL}${url}`,
        data: data
    })
}

function adminPost(data, url) {
    return Axios({
        method: 'post', headers: {'token': localStorage.getItem('adminToken')},
        url: `${URL.apiURL}${url}`,
        data: data
    })
}

function tokenPost(url, discountCoupon) {
    return Axios({
        method: 'post', headers: {'token': localStorage.getItem('token')},
        params: {discountCoupon: discountCoupon},
        url: `${URL.apiURL}${url}`
    })
}

function get(url) {
    return Axios({
        method: 'get', headers: {'token': localStorage.getItem('token')},
        url: `${URL.apiURL}${url}`,
    })
}

function adminGet(url) {
    return Axios({
        method: 'get', headers: {'token': localStorage.getItem('adminToken')},
        url: `${URL.apiURL}${url}`,
    })
}

function deleteData(url) {
    return Axios({
        method: 'delete', headers: {'token': localStorage.getItem('token')},
        url: `${URL.apiURL}${url}`,
    })
}

function update(url) {
    return Axios({
        method: 'put', headers: {'token': localStorage.getItem('token')},
        url: `${URL.apiURL}${url}`,
    })
}

function adminUpdate(url) {
    return Axios({
        method: 'put', headers: {'token': localStorage.getItem('adminToken')},
        url: `${URL.apiURL}${url}`,
    })
}

export {post, adminPost, adminGet, adminUpdate, tokenPost, get, deleteData, update}