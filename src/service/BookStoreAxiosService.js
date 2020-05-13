import Axios from "axios";
import React from "react";
import {displayBookURL, getBookCountURL, getFilterBookURL, getSearchBookURL} from "./Environment";

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

    getSearchedBooks(pageNo, searchText) {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: getSearchBookURL + pageNo + "/" + searchText,
        })
    }
    getFilterBooks(pageNo, sortBy, sortDirection) {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: getFilterBookURL + pageNo + "/" + sortBy + "/" + sortDirection,
        })
    }
}

export default BookStoreAxiosService;