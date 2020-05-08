import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React from "react";
import AdminFrontPage from "../components/admin/AdminFrontPage";

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin"} exact component={AdminFrontPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}