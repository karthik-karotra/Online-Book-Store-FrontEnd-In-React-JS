import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import BookStoreHomePage from "../components/bookstore/js/BookStoreHomePage";
import AddToCart from "../components/bookstore/js/AddToCart";
import OrderSuccessfullPage from '../components/bookstore/js/OrderSuccessfullPage';
import MyOrder from '../components/bookstore/js/MyOrder';
import LoginPage from '../components/login/js/LoginPage';
import ForgotPassword from '../components/login/js/ForgotPassword';
import ResetPassword from '../components/login/js/ResetPassword';
import Verification from '../components/login/js/Verification';
import AdminHomePage from "../components/admin/js/AdminHomePage";
import AdminLogin from "../components/admin/js/AdminLogin";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin/login"} component={AdminLogin} exact/>
                    <Route path={"/admin"} exact component={AdminHomePage}/>
                    <Route path={"/"} exact component={BookStoreHomePage}/>
                    <Route path={"/cart"} exact component={AddToCart}/>
                    <Route path={"/successfull/:random"} exact component={OrderSuccessfullPage}/>
                    <Route path={"/myorder"} exact component={MyOrder}/>
                    <Route path={"/login"} exact component={LoginPage}/>
                    <Route path={"/forgotpassword"} exact component={ForgotPassword}/>
                    <Route path={"/resetpassword"} exact component={ResetPassword}/>
                    <Route path={"/verification"} exact component={Verification}/>
                </Switch>
            </BrowserRouter>
        );
    }
}