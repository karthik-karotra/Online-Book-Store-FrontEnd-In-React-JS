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

    loginUser(data) {
        return Axios({
            method: 'post', headers: {"Content-Type": "application/json"},
            url: "http://localhost:8080/user/login",
            data: JSON.stringify(data),
        })
    }

    verifyEmail(token) {
        return Axios({
            method: 'get', headers: {"Content-Type": "application/json"},
            url: `http://localhost:8080/user/register/confirmation/${token}`,
            data: JSON.stringify(),
        })
    }

    resend(email) {
        return Axios({
            method: 'post', headers: {"Content-Type": "application/json"},
            url: "http://localhost:8080/user/register/resend/confirmation/"+email,
            data: JSON.stringify(),
        })
    }

    forgotPassword(email) {
        return Axios({
            method: 'post', headers: {"Content-Type": "application/json"},
            url: "http://localhost:8080/user/forgot/password//"+email,
            data: JSON.stringify(),
        })
    }

}

export default LoginAndRegistrationAxios;