import Axios from "axios";
import React from "react";
import {postURL} from "./Environment";

class AdminAxiosService extends React.Component {

    addBookToDatabase(data) {
        return Axios({
            method: 'post', headers: {"Content-Type": "application/json"},
            url: postURL,
            data: JSON.stringify(data),
        })
    }
}

export default AdminAxiosService