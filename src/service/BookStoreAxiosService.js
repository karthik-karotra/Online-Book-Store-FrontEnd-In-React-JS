import Axios from "axios";
import React from "react";
import {
    displayBookURL,
    getBookCountURL,
    getFilterBookURL,
    getSearchAndFilterBookURL,
    getSearchBookURL
} from "./Environment";

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
    getSearchAndFilterBooks(pageNo, searchText, filterAttributes) {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: getSearchAndFilterBookURL + pageNo + "/" + searchText + "/" + filterAttributes,
        })
    }


}

export default BookStoreAxiosService;