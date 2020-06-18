import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import LoginAndRegistrationAxios from '../../../service/LoginAndRegistrationAxios';
import {withRouter} from 'react-router';

class Signin extends Component {

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
                new LoginAndRegistrationAxios().loginUser(data).then((response) => {
                    if (response.data.message == "LOGIN SUCCESSFUL") {
                        localStorage.setItem('token', response.headers.authorization)
                        localStorage.setItem('data', response.data.data)
                        this.setState({
                            severity: "success",
                            snackbaropen: true,
                            snackbarmsg: response.data.message
                        }, () => {
                            this.setData(this.state.severity, this.state.snackbaropen, this.state.snackbarmsg)
                        });
                        this.props.history.push("/");
                        window.location.reload(true);
                    } else {
                        this.setState({
                            severity: "error",
                            snackbaropen: true,
                            snackbarmsg: response.data
                        }, () => {
                            this.setData(this.state.severity, this.state.snackbaropen, this.state.snackbarmsg)
                        });
                    }

                })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    setData = (severity, snackbaropen, snackbarmsg) => {
        this.props.sendData(severity, snackbaropen, snackbarmsg);

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

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });

        return (
            <div className="sign-in-htm">
                <ThemeProvider theme={theme}>
                    <div className="group1">
                        <TextField error={this.state.status1}
                                   value={this.state.email}
                                   helperText={this.state.helpertext1}
                                   onClick={this.handleChange}
                                   onChange={this.handleChange}
                                   id="userName" label="Email Id *"
                                   variant="outlined"
                                   fullWidth autoComplete="off" name="email"/>
                    </div>
                    <div className="group1">
                        <TextField error={this.state.status2}
                                   value={this.state.password}
                                   helperText={this.state.helpertext2}
                                   onClick={this.handleChange}
                                   onChange={this.handleChange}
                                   id="passWord" label="Password *"
                                   type="password" variant="outlined"
                                   fullWidth autoComplete="off" name="password"/>
                    </div>
                    <div className="foot-lnk">
                        <a href="/forgotpassword">Forgot Password?</a>
                    </div>
                    <div className="group1">
                        <button className="login-button" variant="contained" onClick={this.handleSubmmit}>Login</button>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(Signin);
            