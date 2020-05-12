import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React from "react";
import AdminFrontPage from "../components/admin/js/AdminFrontPage";
import BookStoreHomePage from "../components/bookstore/js/BookStoreHomePage";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin"} exact component={AdminFrontPage}/>
                    <Route path={"/homepage"} exact component={BookStoreHomePage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}