import React from 'react';
import './AdminFrontPage.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import AdminTopNavigationBar from "./AdminTopNavigationBar";
import BottomBar from "./BottomBar";
import {addBookToDatabase} from "../service/AxiosConfiguration";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";

class AdminFrontPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            bookName: "",
            authorName: "",
            bookPrice: "",
            quantity: "",
            bookDetails: "",
            bookImageSource: "",
            publishingYear: "",
            snackbaropen: false,
            snackbarmsg: '',
            severity: ""
        }
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    handleChange = ({target}) => {
        this.setState({[target.name]: target.value});
    };

    validation = () => {

        var isbnNumberPattern = /^([1-9]{1})([0-9]{3})$/;
        var validNamePattern = /^([a-zA-Z]+[ ]*[a-zA-Z]*)$/;
        var validNumberPattern = /^([1-9]{1,})([0-9]*)$/;
        var publishingYearPattern = /^([1-9]{1})([0-9]{3})$/;
        if (isbnNumberPattern.test(this.state.isbn) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'ISBN No Field Should Not be Empty And Should Be 4 Digit Number'
            });
            return false;
        } else if (validNamePattern.test(this.state.bookName) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'Book Name Field Should Not Be Empty And Can Only Contain 2 Words'
            });
            return false;
        } else if (validNamePattern.test(this.state.authorName) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'Author Name Field Should Not Be Empty And Can Only Contain 2 Words'
            });
            return false;
        } else if (validNumberPattern.test(this.state.bookPrice) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'Book Price Field Should Not Be Empty And Should Be Greater Than Zero'
            });
            return false;
        } else if (validNumberPattern.test(this.state.quantity) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'Quantity Field Should Not Be Empty And Should Be Greater Than Zero'
            });
            return false;
        } else if (publishingYearPattern.test(this.state.publishingYear) == false) {
            this.setState({
                severity: "error",
                snackbaropen: true,
                snackbarmsg: 'Publishing Year Field Should Not Be Empty And Should Be Greater Than 999'
            });
            return false;
        }
        if (this.state.bookDetails.trim() == "" || this.state.bookImageSource.trim() == "") {
            this.setState({severity: "error", snackbaropen: true, snackbarmsg: 'Fields Should Not Be Empty'});
            return false;
        } else {
            const data = {
                isbn: this.state.isbn,
                bookName: this.state.bookName,
                authorName: this.state.authorName,
                bookPrice: this.state.bookPrice,
                quantity: this.state.quantity,
                bookDetails: this.state.bookDetails,
                bookImageSource: this.state.bookImageSource,
                publishingYear: this.state.publishingYear
            }
            addBookToDatabase(data)
            this.setState({
                severity: "success",
                snackbaropen: true,
                snackbarmsg: 'Book Added Successfully'
            });
            return true;
        }
    }

    render() {
        return (
            <div>
                <AdminTopNavigationBar/>
                <div className="container">
                    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.snackbaropen}
                              autoHideDuration={4000} onClose={this.snackbarClose}>
                        <Alert onClose={this.snackbarClose} severity={this.state.severity} variant={"filled"}>
                            {<span id="message-id">{this.state.snackbarmsg}</span>}
                        </Alert>
                    </Snackbar>
                    <div className="content">
                        <div className="data">
                            <h2>Books Details</h2>
                        </div>
                        <div className="data">
                            <TextField className="input" id="outlined-basic" label="ISBN No." variant="outlined"
                                       value={this.state.isbn} onChange={this.handleChange} name="isbn"/>
                            <TextField className="input" id="outlined-basic" label="Book Name" variant="outlined"
                                       value={this.state.bookName} onChange={this.handleChange} name="bookName"/>
                        </div>
                        <div className="data">
                            <TextField className="input" id="outlined-basic" label="Author Name" variant="outlined"
                                       value={this.state.authorName} onChange={this.handleChange}
                                       name="authorName"/>
                            <TextField className="input" id="outlined-basic" label="Price" variant="outlined"
                                       value={this.state.bookPrice} onChange={this.handleChange} name="bookPrice"/>
                        </div>
                        <div className="data">
                            <TextField className="input" id="outlined-basic" label="Quantity" variant="outlined"
                                       value={this.state.quantity} onChange={this.handleChange} name="quantity"/>
                            <TextField className="input" id="outlined-basic" label="Publishing Year"
                                       variant="outlined"
                                       value={this.state.publishingYear} onChange={this.handleChange}
                                       name="publishingYear"/>
                        </div>
                        <div className="data2">
                            <TextField className="input" id="outlined-basic" label="Book Cover" variant="outlined"
                                       value={this.state.bookImageSource} onChange={this.handleChange}
                                       name="bookImageSource"/>
                        </div>
                        <div className="data2">
                            <TextField className="input" id="outlined-multiline-flexible" label="Description"
                                       placeholder="Description" multiline rowsMax={2} variant="outlined"
                                       value={this.state.bookDetails} onChange={this.handleChange}
                                       name="bookDetails"/>
                        </div>
                        <div className="data">
                            <Button className="button" variant="contained"
                                    onClick={this.validation} style={{backgroundColor: "rgb(51, 51, 255)"}}>
                                <div className="buttonfont">Add</div>
                            </Button>
                        </div>
                        <div>
                            <BottomBar/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminFrontPage;
