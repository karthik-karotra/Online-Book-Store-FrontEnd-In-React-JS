import Axios from "axios";
import React from "react";
import {displayBookURL, getBookCountURL} from "./Environment";

class BookStoreAxiosService extends React.Component {

    getBooksFromDatabase(pageNo) {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: displayBookURL + pageNo,
        })
    }

    getCount() {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: getBookCountURL,
        })
    }
}

export default BookStoreAxiosService;