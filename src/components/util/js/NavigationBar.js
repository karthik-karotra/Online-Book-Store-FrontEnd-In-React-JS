import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBookSharp";
import {Link} from "react-router-dom";
import '../css/NavigationBar.css'
import Badge from "@material-ui/core/Badge";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import Dialog from "@material-ui/core/Dialog";
import LoginPage from "../../login/js/LoginPage";
import DialogContent from "@material-ui/core/DialogContent";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText1: "",
            visiblityValueOfLogin:'hidden',
            visiblityOfDialogBox:false,
            visibilityOfCloseIcon:'hidden',
            isLoggedIn: false
        }
    }

    handleChange = (event) => {
        this.setState({searchText1: event.target.value}, () => {
            this.props.getSearchedText(this.state.searchText1)
        })
    }

    handleLoginBoxVisiblity=(event)=>{
        if(`${this.state.visiblityValueOfLogin}`==="hidden"){
            this.setState({visiblityValueOfLogin:"visible"})
            return;
        }
        if(`${this.state.visiblityValueOfLogin}`==="visible"){
            this.setState({visiblityValueOfLogin:"hidden"})
            return;
        }
    }

    handleDialogueBoxVisiblity=(event)=>{
        this.setState({visiblityOfDialogBox:true,visibilityOfCloseIcon:"visible"})
    }

    handleLogoutBoxVisibility = () => {
        this.setState({isLoggedIn: false, visiblityValueOfLogin: 'hidden'})
        localStorage.removeItem('token')
        window.location.reload(true)
    }

    setClickFlag=(flag)=>{
        this.setState({visiblityOfDialogBox:flag,visibilityOfCloseIcon:"visible"})
    }

    componentDidMount() {
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        let user = localStorage.getItem('token');
        //alert(user)
        console.log("abc")
        console.log(user)
        if(user){
           // alert("1")
            this.setState({
                // logorsign: "LOGOUT",
                // redirect: "cart",
                isLoggedIn: true
            })}

        if(user == "null" || user == "undefined"){
          //  alert("2")
            this.setState({
                // logorsign: "LOGIN/SIGNUP",
                // redirect: "login",
                isLoggedIn: false
            })}
    }


    render() {

        const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        return (
            <div>
                {!this.state.isLoggedIn ?
                <Card className="loginsignupcard" style={{boxShadow:"0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    visibility:this.state.visiblityValueOfLogin,position:"fixed"}} variant="outlined">
                    <CardContent><Typography style={{fontWeight: "bold"}}>Welcome</Typography>
                        <Typography style={{fontSize: "small" ,marginTop:"2px"}} color="textSecondary" gutterBottom className="gutterbottomfont">To access the account and manage orders</Typography>
                        <hr />
                        <Button className="loginorsignupbutton" onClick={this.handleDialogueBoxVisiblity} >LOGIN/SIGNUP</Button>
                    </CardContent>
                </Card>
                :
                <Card  className="loginsignupcard" style={{
                    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    visibility: this.state.visiblityValueOfLogin}} variant="outlined">
                    <CardContent><Typography style={{fontWeight: "bold"}}>Hello, {this.props.getFullName}</Typography>
                    <hr />
                    <Typography style={{marginTop: "9px",display:"flex"}} color="textSecondary" gutterBottom><Link to="/myorder"><CardGiftcardIcon style={{marginRight: "6px"}}/></Link><Link to="/myorder">My Orders</Link></Typography>
                    <Button className="loginorsignupbutton"
                        onClick={this.handleLogoutBoxVisibility}>LOGOUT</Button>
                    </CardContent>
                </Card>
                }

                <AppBar position="fixed" style={{backgroundColor: "rgb(150, 0, 0)"}}>
                    <Toolbar className="maintoolbar">
                        <div className="logo">
                            <MenuBookIcon edge="start" className="bookIcon"/>
                        </div>
                        <Typography className="title" variant="h6" noWrap>
                            The Country Bookshop
                        </Typography>
                        <div className="search" style={url === '' ? {visibility: "visible"} : {visibility: "hidden"}}>
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
                        

            <div className="addtocarticon" style={url === '' ? {visibility: "visible"} : {visibility: "hidden"}}>
            <Badge badgeContent={this.props.count} color="secondary" className="badgeclass">
            <Link to="/cart"><LocalGroceryStoreIcon className="carticon"/></Link>
            </Badge>
        </div>

                        <div className="loginsignup" style={url != '' ? {visibility: "hidden"} : this.state.visiblityValueOfLogin === "visible" ? {borderBottom: "white solid 5px"} : {borderBottom: "rgb(150, 0, 0) solid 5px"}}>
                            <PermIdentityIcon className="userIcon" onClick={this.handleLoginBoxVisiblity}/>
                        </div>

                    </Toolbar>
                </AppBar>
                {/*<div className="closeiconfordialoguebox"><CloseIcon /></div>*/}
                <Dialog className="maindialoguebox" aria-labelledby="customized-dialog-title" open={this.state.visiblityOfDialogBox}>
                    <DialogContent className="dialoguecontent" id="customized-dialog-title" >
                        <LoginPage getClickFlag={this.setClickFlag}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}