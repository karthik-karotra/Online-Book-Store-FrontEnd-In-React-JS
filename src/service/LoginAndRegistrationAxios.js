import Axios from 'axios';
import React from "react";

class LoginAndRegistrationAxios extends React.Component {

    addUser(data) {
        return Axios({
            method: 'post', headers: {"Content-Type": "application/json"},
            url: "http://localhost:8080/user/register",
            data: JSON.stringify(data),
        })
    }

}

export default LoginAndRegistrationAxios;