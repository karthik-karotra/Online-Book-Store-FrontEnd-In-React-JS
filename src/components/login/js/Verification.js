import React from 'react';
import '../css/Verification.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import LoginAndRegistrationAxios from "../../../service/LoginAndRegistrationAxios";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import NavigationBar from "../../util/js/NavigationBar";
import {withRouter} from 'react-router';

class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
            accountVerification: 'account-verified-disable',
            verificationUnsuccessfull: 'verification-unsuccessfull-disable',
            status: '',
            errorMessage: '',
            email: ''
        }
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    resendEmail() {
        new LoginAndRegistrationAxios().verifyEmail(this.props.location.search).then((response) => {
            if (`${response.data}` === "Account Verified") {
                this.setState({accountVerification: 'account-verified'})
            } else {
                this.setState({verificationUnsuccessfull: 'verification-unsuccessfull'})
            }
        })
    }

    handleChange = (e) => {
        this.setState({email: e.target.value}, () => {
            this.emailValidation()
        })
    }

    emailValidation() {
        this.setState({
            status: true,
            errorMessage: 'Required*'
        })
        var emailPattern = /^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/;
        this.setState({
            email: this.state.email.trim()
        })
        if (this.state.email.trim() !== "") {
            if (emailPattern.test(this.state.email) === false) {
                this.setState({
                    status: true,
                    errorMessage: 'Enter Valid Email ID',
                })
            } else {
                this.setState({
                    status: false,
                    errorMessage: ' ',
                })
            }
        }
    }

    handleVerify = () => {
        if (this.state.email.trim() === "") {
            this.setState({
                status: true,
                errorMessage: 'Required*'
            });
        }
        if (this.state.email.trim() !== "" && this.state.status == false) {
            new LoginAndRegistrationAxios().resend(this.state.email).then((response) => {
                if (response.data == "Verification Link Has Been Sent To Your Account") {
                    this.setState({
                        severity: "success",
                        snackbaropen: true,
                        snackbarmsg: response.data
                    })
                } else {
                    this.setState({
                        severity: "error",
                        snackbaropen: true,
                        snackbarmsg: response.data
                    });
                }
            });
        }
    }

    login = () => {
        this.props.history.push("/login");
    }

    componentDidMount() {
        this.resendEmail();
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        return (
            <div className="verification-container">
                <NavigationBar/>
                <div className="layer">
                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                              autoHideDuration={4000} onClose={this.snackbarClose}>
                        <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                            {<span id="message-id">{this.state.snackbarmsg}</span>}
                        </Alert>
                    </Snackbar>
                    <div className={this.state.accountVerification}>
                        <CheckCircleIcon className="tick"/>
                        <div className="verified">
                            <div className="verified-header">Verified!</div>
                            <div className="verified-message">Your email id is successfully verified!</div>
                        </div>
                        <div className="login-button">
                            <button className="redirect-button" onClick={this.login}>Login</button>
                        </div>
                    </div>
                    <div className={this.state.verificationUnsuccessfull}>
                        <ErrorIcon className="error"/>
                        <div className="token-expired">
                            <div className="token-expired-header">Token Expired !</div>
                            <div>
                                <div className="token-expired-message">Your account activation token is no longer
                                    valid
                                </div>
                                <div className="token-expired-message">We'll need to re-send your authentication email
                                </div>
                            </div>
                        </div>
                        <div className="token-expired-form">
                            <div className="expired-form">
                                <div className="textField">
                                    <ThemeProvider theme={theme}>
                                        <TextField id="outlined-basic" className="email" label="Email"
                                                   variant="outlined" error={this.state.status}
                                                   helperText={this.state.errorMessage} value={this.state.email}
                                                   onChange={this.handleChange}/>
                                    </ThemeProvider>
                                </div>
                                <button className="resend-email" onClick={this.handleVerify}>Resend Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Verification);