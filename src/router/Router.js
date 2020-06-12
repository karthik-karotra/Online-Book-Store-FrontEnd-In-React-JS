import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import React from "react";
import AdminAddBook from "../components/admin/js/AdminAddBook";
import BookStoreHomePage from "../components/bookstore/js/BookStoreHomePage";
import AddToCart from "../components/bookstore/js/AddToCart";
import OrderSuccessfullPage from '../components/bookstore/js/OrderSuccessfullPage';
import MyOrder from '../components/bookstore/js/MyOrder';
import LoginPage from '../components/login/js/LoginPage';
import ForgotPassword from '../components/login/js/ForgotPassword';
import ResetPassword from '../components/login/js/ResetPassword';
import Verification from '../components/login/js/Verification';

export default class DefaultRoutes extends React.Component {

    state = {
        auth: true
    }

    componentDidMount(){
        if (!localStorage.getItem("token")) {
            this.setState({
                auth: false
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin"} exact component={AdminAddBook}/>
                    <Route path={"/"} exact component={BookStoreHomePage}/>
                    <Route path={"/cart"} exact component={AddToCart}/>
                    <Route path={"/successfull"} exact component={OrderSuccessfullPage}/>
                    <Route path={"/myorder"} exact component={MyOrder}/>
                    <Route path={"/login"} exact component={LoginPage}/>
                    <Route path={"/forgotpassword"} exact component={ForgotPassword}/>
                    <Route path={"/resetpassword"} exact component={ResetPassword}/>
                    <Route path={"/verification"} exact component={Verification} />
                </Switch>
            </BrowserRouter>
        );
    }
}