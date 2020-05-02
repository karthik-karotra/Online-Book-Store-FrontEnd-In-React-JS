import Axios from "axios";

export function addBookToDatabase(data) {
    return Axios({
        method: 'post', headers: {"Content-Type": "application/json"},
        url: "http://localhost:8080/onlinebookstore/addbook",
        data: JSON.stringify(data),
    })
}