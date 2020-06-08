import Axios from 'axios';
import URL from '../config/UrlConstant';

function post(data, url) {
    return Axios({
        method: 'post', headers: { 'token': localStorage.getItem('token') },
        url: `${URL.apiURL}${url}`,
        data: data
    })
}

function tokenPost(url) {
    return Axios({
        method: 'post', headers: { 'token': localStorage.getItem('token') },
        url: `${URL.apiURL}${url}`
    })
}

function get(url) {
    return Axios({
        method: 'get', headers: { 'token': localStorage.getItem('token') },
        url: `${URL.apiURL}${url}`,
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
        method: 'put', headers: { 'token': localStorage.getItem('token') },
        url: `${URL.apiURL}${url}`,
    })
}

export {post, tokenPost, get, deleteData, update}