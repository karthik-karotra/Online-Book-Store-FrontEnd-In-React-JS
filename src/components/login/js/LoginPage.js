import React, {Component} from 'react';
import '../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Login from '../../../assests/images/Login.png';
import Signin from './Signin';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';

class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state={
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
            email:'',
            status1:false,
            helpertext1:' ',
            password:'',
            status2:false,
            helpertext2:' ',
            fullName:'',
            status3:false,
            helpertext3:' ',
            phoneNumber:'',
            status4:false,
            helpertext4:' ',
            loginChecked:true,
            signupChecked:false,
            loginFormFlag:true
        }
    }
    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    handleChange=({target})=>{
        if(`${[target.name]}`==="email"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.emailValidation()
                });
        }
        if(`${[target.name]}`==="password"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.passwordValidation()
                });
        }
        if(`${[target.name]}`==="fullName"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.userNameValidation()
                });
        }
        if(`${[target.name]}`==="phoneNumber"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.phoneNumberValidation()
                });
        }

    };

    handleSubmmit=()=>{
        if(this.state.fullName.trim().length===0){
            this.setState({
                status3:true,
                helpertext3:'Required*'
            });
        }
        if(this.state.email.trim().length===0){
            this.setState({
                status1:true,
                helpertext1:'Required*'
            });
        }
        if(this.state.password.trim().length===0){
            this.setState({
                status2:true,
                helpertext2:'Required*'
            });
        }

        if(this.state.phoneNumber.trim().length===0){
            this.setState({
                status4:true,
                helpertext4:'Required*'
            });
        }


        if (this.state.fullName.trim() !== "" && this.state.email.trim() !== "" && this.state.password.trim() !== "" && this.state.phoneNumber.trim() !== "") {
            if (this.state.status1 === false && this.state.status2 === false && this.state.status3 === false && this.state.status4 === false) {

                const data = {
                    email: this.state.email,
                    fullName: this.state.fullName,
                    password: this.state.password,
                    phoneNo: this.state.phoneNumber,
                    status: false,
                }
            }
        }

    }

    emailValidation(){
        this.setState({
            status1:true,
            helpertext1:'Required*'
        })
        var emailPattern=/^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/;
        this.setState({
            email: this.state.email.trim()
        })
        if(this.state.email.trim()!==""){
            if(emailPattern.test(this.state.email)===false){
                this.setState({
                    status1:true,
                    helpertext1:'Enter Valid Email ID',
                })
            } else{
                this.setState({
                    status1:false,
                    helpertext1:' ',
                })
            }
        }
    }

    passwordValidation(){
        this.setState({
            status2:true,
            helpertext2:'Required*'
        })
        var passwordPattern=/^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$/;
        this.setState({
            password: this.state.password.trim()
        })
        if(this.state.password.trim()!==""){
            if(passwordPattern.test(this.state.password)===false){
                this.setState({
                    status2:true,
                    helpertext2:'Password Contains Min 8 Characters',
                })
            } else{
                this.setState({
                    status2:false,
                    helpertext2:' ',
                })
            }
        }
    }
    userNameValidation(){
        this.setState({
            status3:true,
            helpertext3:'Required*'
        })
        var userNamePattern=/^.{3,50}$/;
        this.setState({
            fullName: this.state.fullName
        })
        if(this.state.fullName.trim()!==""){
            if(userNamePattern.test(this.state.fullName)===false){
                this.setState({
                    status3:true,
                    helpertext3:'Name Contains Min 3 Characters',
                })
            } else{
                this.setState({
                    status3:false,
                    helpertext3:' ',
                })
            }
        }
    }

    phoneNumberValidation(){
        this.setState({
            status4:true,
            helpertext4:'Required*'
        })
        var phoneNumberPattern=/^([6-9]{1}[0-9]{9})$/;
        this.setState({
            phoneNumber: this.state.phoneNumber.trim()
        })
        if(this.state.phoneNumber.trim()!==""){
            if(phoneNumberPattern.test(this.state.phoneNumber)===false){
                this.setState({
                    status4:true,
                    helpertext4:'Enter Valid Mobile Number',
                })
            } else{
                this.setState({
                    status4:false,
                    helpertext4:' ',
                })
            }
        }
    }

    handleTabSelection=({target})=>{
        if(`${[target.name]}`==="login"){
            this.setState({loginChecked:true,signupChecked:false})
        }
        if(`${[target.name]}`==="signup"){
            this.setState({loginChecked:false,signupChecked:true})
        }
    }

    getData=(severity,snackbaropen,snackbarmsg)=>{
        this.setState({
            severity:severity,
            snackbaropen:snackbaropen,
            snackbarmsg:snackbarmsg
        })
    }
    reset = () => {
        this.setState({
            email:"",
            password:"",
            fullName:"",
            phoneNumber:"",
        })
    }

    getThisEvent=()=>{
        const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        var flag=false;
        if(url===''){
            this.props.getClickFlag(flag);
        }
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        // console.log(this.state.helperText);
        return (
            <div className="hero" style={url === '' ? {backgroundColor: "transparent"} : {backgroundColor: "#b3b3b3"}}>
                <div className="crossiconinlogin" onClick={this.getThisEvent} style={url === '' ? {visibility: "visible"} : {visibility: "hidden"}}><CloseIcon /></div>
                <div className="user-login-form">
                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                              autoHideDuration={4000} onClose={this.snackbarClose}>
                        <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                            {<span id="message-id">{this.state.snackbarmsg}</span>}
                        </Alert>
                    </Snackbar>
                    <Card className="form-box" style={{borderRadius: "5%", backgroundColor: " #f2f2f2"}}>
                        <img src={Login} className="login-img"/>
                        <div style={{marginLeft: "70px", marginTop: "3%"}}>
                            <h3 style={{fontWeight: "bold"}}>
                                THE COUNTRY BOOK SHOP
                            </h3>
                        </div>
                    </Card>


                    <Card className="login-box" style={{borderRadius: "2%", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.5)"}}>
                        <div className="login-wrap">
                            <div className="login-html">
                                <input id="tab-1" type="radio" name="login" className="sign-in" checked={this.state.loginChecked} onClick={this.handleTabSelection} /><label
                                htmlFor="tab-1" className="tab1">Login</label>
                                <input id="tab-2" type="radio" name="signup" className="sign-up" checked={this.state.signupChecked} onClick={this.handleTabSelection}/>
                                <label htmlFor="tab-2" className="tab2">SignUp</label>
                                <div className="login-form">
                                    <Signin sendData={this.getData} />
                                    {/*Sigun Up*/}
                                    <div className="sign-up-htm">
                                        <ThemeProvider theme={theme}>
                                            <div className="group">
                                                <TextField error={this.state.status3}
                                                           name="fullName"
                                                           value={this.state.fullName}
                                                           helperText={this.state.helpertext3}
                                                           onClick={this.handleChange}
                                                           onChange={this.handleChange}
                                                           id="userName" label="Full Name"
                                                           variant="outlined"
                                                           fullWidth required autoComplete="off"
                                                />
                                            </div>
                                            <div className="group">
                                                <TextField error={this.state.status1}
                                                           name="email"
                                                           value={this.state.email}
                                                           helperText={this.state.helpertext1}
                                                           onClick={this.handleChange}
                                                           onChange={this.handleChange}
                                                           id="userName" label="Email Id *"
                                                           variant="outlined" fullWidth
                                                           autoComplete="off" />
                                            </div>
                                            <div className="group">
                                                <TextField error={this.state.status2}
                                                           name="password"
                                                           value={this.state.password}
                                                           id="password" type="password"
                                                           helperText={this.state.helpertext2}
                                                           onClick={this.handleChange}
                                                           onChange={this.handleChange}
                                                           id="userName" label="Password *"
                                                           variant="outlined" fullWidth
                                                           autoComplete="off" />
                                            </div>
                                            <div className="group">
                                                <TextField error={this.state.status4}
                                                           name="phoneNumber"
                                                           value={this.state.phoneNumber}
                                                           helperText={this.state.helpertext4}
                                                           onClick={this.handleChange}
                                                           onChange={this.handleChange}
                                                           id="userName" label="Phone Number *"
                                                           variant="outlined" fullWidth
                                                           autoComplete="off" />
                                            </div>
                                            <div className="group">
                                                <button className="login-button" onClick={this.handleSubmmit}>Sign Up</button>
                                            </div>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default LoginPage;
