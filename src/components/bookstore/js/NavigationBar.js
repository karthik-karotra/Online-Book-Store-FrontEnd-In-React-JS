import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBookSharp";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import '../css/NavigationBar.css'

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText1: ""
        }
    }

    handleChange = (event) => {
        this.setState({searchText1: event.target.value}, () => {
            this.props.getSearchedText(this.state.searchText1)
        })
    }

    render() {
        return (
            <div>
                <AppBar position="fixed" style={{backgroundColor: "rgb(150, 0, 0)"}}>
                    <Toolbar className="maintoolbar">
                        <div className="logo">
                            <MenuBookIcon edge="start" className="bookIcon"/>
                        </div>
                        <Typography className="title" variant="h6" noWrap>
                            The Country Bookshop
                        </Typography>
                        <div className="search">
                            <div className="searchIcon">
                                <SearchIcon />
                            </div>
                            <div className="searchText">
                                <InputBase
                                    placeholder="Search"
                                    value={this.state.searchText}
                                    onChange={this.handleChange}
                                /></div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}