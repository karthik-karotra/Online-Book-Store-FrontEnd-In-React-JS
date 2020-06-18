import React from 'react';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import '../css/ResetPassword.css';
import NavigationBar from "../../util/js/NavigationBar";
import LoginAndRegistrationAxios from "../../../service/LoginAndRegistrationAxios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Link} from "react-router-dom";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            status1: false,
            helperText1: ' ',
            status2: false,
            helperText2: ' ',
            snackbaropen: false,
            snackbarmsg: '',
            severity: ""
        }
    }

    handleChange = ({target}) => {
        if (`${[target.name]}` === "password") {
            this.setState({[target.name]: target.value},
                () => {
                    this.passwordValidation()
                });
        }
        if (`${[target.name]}` === "confirmPassword") {
            this.setState({[target.name]: target.value},
                () => {
                    this.confirmPasswordValidation()
                });
        }
    }

    snackbarClose = () => {
        this.setState({snackbaropen: false});
    };

    handleSubmit = () => {
        if (this.state.password.trim().length === 0) {
            this.setState({
                status1: true,
                helperText1: 'Required*'
            });
        }
        if (this.state.confirmPassword.trim().length === 0) {
            this.setState({
                status2: true,
                helperText2: 'Required*'
            });
        }
        if (this.state.password.trim().length > 0 && this.state.confirmPassword.trim().length > 0) {
            const data = {password: this.state.password}
            if (this.state.status1 == false && this.state.status2 == false) {
                new LoginAndRegistrationAxios().resetPassword(data, this.props.location.search).then((response) => {
                    if (`${response.data}` === "Password Reseted Successfully") {
                        this.setState({
                            severity: "success",
                            snackbaropen: true,
                            snackbarmsg: response.data,
                        })
                        setTimeout(() => {
                            this.props.history.push("/login");
                        }, 2000);
                    } else {
                        this.setState({
                            severity: "error",
                            snackbaropen: true,
                            snackbarmsg: "Something Went Wrong!!"
                        });
                    }
                })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        }
    }

    passwordValidation() {
        this.setState({
            status1: true,
            helperText1: 'Required*'
        })
        const passwordPattern = /^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$/;
        this.setState({
            password: this.state.password.trim()
        });
        if (this.state.password.trim() !== "") {
            if (passwordPattern.test(this.state.password) === false) {
                this.setState({
                    status1: true,
                    helperText1: 'Password Contains Min 8 Characters',
                })
            } else {
                this.setState({
                    status1: false,
                    helperText1: ' ',
                })
            }
        }
    }

    confirmPasswordValidation() {
        var a1 = this.state.password;
        var a2 = this.state.confirmPassword;
        this.setState({
            status2: true,
            helperText2: 'Required*'
        })

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({

                status2: true,
                helperText2: 'Password & Confirm Password Should Be Same'
            })
        }
        if (this.state.password === this.state.confirmPassword) {
            this.setState({
                status2: false,
                helperText2: ' '
            })

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
        return (
            <div className="reset-container-wrapper">
                <NavigationBar/>

                <div className="layer-inner">

                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                              autoHideDuration={4000} onClose={this.snackbarClose}>
                        <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                            {<span id="message-id">{this.state.snackbarmsg}</span>}
                        </Alert>
                    </Snackbar>
                    <div className="reset-container-main">
                        <div className="reset-header">
                            <h1>Reset Your Password?</h1>
                        </div>
                        <div className="reset-form-container">
                            <div className="reset-form">
                                <div className="reset-paragraph">
                                    <p className="reset-password-paragraph" style={{opacity: 0.5}}>You can change your
                                        password for security reasons or reset it if you forget it. Reset your password
                                        here!!</p>
                                </div>
                                <div className="reset-textfield">
                                    <ThemeProvider theme={theme}>
                                        <TextField error={this.state.status1} helperText={this.state.helperText1}
                                                   type="password" className="reset-password-textfield" label="Password"
                                                   variant="outlined" onChange={this.handleChange} name="password"/>
                                        <TextField error={this.state.status2} helperText={this.state.helperText2}
                                                   type="password" className="reset-password-textfield"
                                                   label="Confirm Password" variant="outlined"
                                                   onChange={this.handleChange} name="confirmPassword"/>
                                    </ThemeProvider>
                                    <button className="submit-button" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="reset-account">
                            <Link to="/login">
                                <button className="reset-create-button">CREATE ACCOUNT</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ResetPassword;