import Axios from "axios";

export function getBooksFromDatabase(pageNo) {
    return Axios({
        method: 'get', headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/books/"+pageNo,
    })
}

export function getCount() {
    return Axios({
        method: 'get', headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/books/count",
    })
}