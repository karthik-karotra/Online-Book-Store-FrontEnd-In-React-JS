import Axios from "axios";

export function addBookToDatabase(data) {
    return Axios({
        method: 'post', headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/admin/book",
        data: JSON.stringify(data),
    })
}

export function getBooksFromDatabase() {
    return Axios({
        method: 'get', headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/bookstore/list",
    })
}