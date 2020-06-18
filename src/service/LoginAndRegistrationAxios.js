import {get, post} from './Service'

class LoginAndRegistrationAxios {

    addUser(data) {
        return (post(data, 'user/register'))
    }

    loginUser(data) {
        return (post(data, 'user/login'))
    }

    verifyEmail(token) {
        return (get(`user/register/confirmation/${token}`))
    }

    resend(email) {
        return (post(email, `user/register/resend/confirmation/${email}`))
    }

    forgotPassword(email) {
        return (post(email, `user/forgot/password/${email}`))
    }

    resetPassword(data, token) {
        return (post(data, `user/reset/password/${token}`))
    }
}

export default LoginAndRegistrationAxios;