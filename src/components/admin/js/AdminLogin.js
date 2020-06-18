import React, {Component} from 'react'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import '../css/AdminLogin.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: '',
            severity: "",
            email: "",
            status1: false,
            helpertext1: ' ',
            password: "",
            status2: false,
            helpertext2: ' ',
        }
    }

    handleChange = ({target}) => {
        if ([target.name] == "email") {
            this.setState({[target.name]: target.value},
                () => {
                    this.emailValidation()
                });
        }
        if ([target.name] == "password") {
            this.setState({[target.name]: target.value},
                () => {
                    this.passwordValidation()
                });
        }
    };

    handleSubmmit = () => {
        if (this.state.email.trim() === "") {
            this.setState({
                status1: true,
                helpertext1: 'Required*'
            });
        }
        if (this.state.password.trim() === "") {
            this.setState({
                status2: true,
                helpertext2: 'Required*'
            });
        }
        if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
            if (this.state.status1 === false && this.state.status2 === false) {
                const data = {
                    email: this.state.email,
                    password: this.state.password,
                }
            }
        }
    }

    emailValidation() {
        this.setState({
            status1: true,
            helpertext1: 'Required*'
        })
        var emailPattern = /^([a-zA-Z]{3,}([.|_|+|-]?[a-zA-Z0-9]+)?[@][a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?)$/;
        this.setState({
            email: this.state.email.trim()
        })
        if (this.state.email.trim() !== "") {
            if (emailPattern.test(this.state.email) === false) {
                this.setState({
                    status1: true,
                    helpertext1: 'Enter Valid Email ID',
                })
            } else {
                this.setState({
                    status1: false,
                    helpertext1: ' ',
                })
            }
        }
    }

    passwordValidation() {
        this.setState({
            status2: true,
            helpertext2: 'Required*'
        })
        var passwordPattern = /^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$/;
        this.setState({
            password: this.state.password.trim()
        })
        if (this.state.password.trim() !== "") {
            if (passwordPattern.test(this.state.password) === false) {
                this.setState({
                    status2: true,
                    helpertext2: 'Password Contains Min 8 Characters',
                })
            } else {
                this.setState({
                    status2: false,
                    helpertext2: ' ',
                })
            }
        }
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
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
            <div className="admin-login-wrapper">
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.snackbaropen}
                          autoHideDuration={4000} onClose={this.snackbarClose}>
                    <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                        {<span id="message-id">{this.state.snackbarmsg}</span>}
                    </Alert>
                </Snackbar>
                <div class="admin-login-form-container">
                    <div className="admin-login-form">
                        <div className="admin-header">
                            <h2>LOGIN</h2>
                            <div className="line"></div>
                        </div>
                        <div className="login-upper-layer">
                            <ThemeProvider theme={theme}>
                                <div className="admin-textfeild">
                                    <TextField error={this.state.status1}
                                               value={this.state.email}
                                               helperText={this.state.helpertext1}
                                               onClick={this.handleChange}
                                               onChange={this.handleChange}
                                               id="userName" label="Email Id *"
                                               variant="outlined"
                                               fullWidth autoComplete="off" name="email"/>
                                </div>
                                <div className="admin-textfeild">
                                    <TextField error={this.state.status2}
                                               value={this.state.password}
                                               helperText={this.state.helpertext2}
                                               onClick={this.handleChange}
                                               onChange={this.handleChange}
                                               id="passWord" label="Password *"
                                               type="password" variant="outlined"
                                               fullWidth autoComplete="off" name="password"/>
                                </div>
                                <div className="admin-forgot">
                                    <a href="/forgotpassword">Forgot Password?</a>
                                </div>
                            </ThemeProvider>
                        </div>
                        <div className="admin-login-button">
                            <button className="login-admin-button" variant="contained"
                                    onClick={this.handleSubmmit}>Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;
