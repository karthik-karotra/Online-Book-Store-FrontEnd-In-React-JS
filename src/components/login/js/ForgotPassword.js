import React from 'react';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import '../css/forgot.css';
import NavigationBar from "../../util/js/NavigationBar";
import LoginAndRegistrationAxios from "../../../service/LoginAndRegistrationAxios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Link} from "react-router-dom";

class ForgotPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            status1:false,
            helperText1:' ',
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
        }
    }

    snackbarClose = () => {
        this.setState({snackbaropen: false});
    };


    handleChange=(e)=>{
        this.setState({email:e.target.value},()=>{ this.emailValidation()})
    }

    emailValidation(){
        this.setState({
            status1:true,
            helperText1:'Required*'
        })
        var emailPattern=/^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/;
        this.setState({
            email: this.state.email.trim()
        })
        if(this.state.email.trim()!==""){
            if(emailPattern.test(this.state.email)===false){
                this.setState({
                    status1:true,
                    helperText1:'Enter Valid Email ID',
                })
            } else{
                this.setState({
                    status1:false,
                    helperText1:' ',
                })
            }
        }
    }

    handleSubmit=()=>{
        if(this.state.email.trim().length===0){
            this.setState({
                status1:true,
                helperText1:'Required*'
            });
        }
        new LoginAndRegistrationAxios().forgotPassword(this.state.email).then((response) => {
            if (`${response.data}` === "We've Sent A Password Reset Link To Your Email Address") {
                this.setState({
                    severity: "success",
                    snackbaropen: true,
                    snackbarmsg: response.data,
                })
            } else {
                this.setState({
                    severity: "error",
                    snackbaropen: true,
                    snackbarmsg: response.data
                });
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }


    render(){
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        return(
            <div className="forgot-container-wrapper">
                <NavigationBar />
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                          autoHideDuration={4000} onClose={this.snackbarClose}>
                    <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                        {<span id="message-id">{this.state.snackbarmsg}</span>}
                    </Alert>
                </Snackbar>
                <div className="forgot-container-main">
                    <div className="forgot-header">
                        <h1>Forgot Your Password?</h1>
                    </div>
                    <div className="forgot-container">
                        <div className="forgot-email-form">
                            <div className="paragraph">
                                <p className="forgot-password-paragraph" style={{opacity: 0.5}}>Enter your email address and we'll send you a link to reset your password</p>
                            </div>
                            <div className="forgot-textfield">
                                <ThemeProvider theme={theme}>
                                    <TextField error={this.state.status1} helperText={this.state.helperText1}
                                               className="forgot-password-textfield" label="Email"
                                               value={this.state.email} variant="outlined" onChange={this.handleChange} />
                                </ThemeProvider>
                                <button className="forgot-submit-button" onClick={this.handleSubmit}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                    <div className="create-account">
                        <Link to="/login" ><button className="forgot-create-button">CREATE ACCOUNT</button></Link>
                    </div>
                </div>

            </div>
        );
    }
}
export default ForgotPassword;