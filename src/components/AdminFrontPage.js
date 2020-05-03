import React from 'react';
import './AdminFrontPage.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import AdminTopNavigationBar from "./AdminTopNavigationBar";
import BottomBar from "./BottomBar";
import {addBookToDatabase} from "../service/AxiosConfiguration";

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
            publishingYear: ""
        }
    }

    handleChange = ({target}) => {
        this.setState({[target.name]: target.value});
    };

    validation = () => {
        var isbnNumberPattern = /^([1-9]{1})([0-9]{3})$/;
        var validNamePattern = /^([A-Z]{1})([a-zA-Z]{2,})$/;
        var validNumberPattern = /^([1-9]{1,})([0-9]*)$/;
        var publishingYearPattern = /^([1-9]{1})([0-9]{3})$/;
        if (this.state.isbn.trim() == "") {
            alert("ISBN Number Should Not Be Blank");
            return false;
        } else if (isbnNumberPattern.test(this.state.isbn) == false) {
            alert("ISBN No Should Be 4 Digit Number");
            return false;
        } else if (this.state.bookName.trim() == "") {
            alert("Book Name Should Not Be Blank");
            return false;
        } else if (validNamePattern.test(this.state.bookName) == false) {
            alert("Book Name start with caps and minimum has three character");
            return false;
        } else if (this.state.authorName.trim() == "") {
            alert("Author Name Should Not Be Blank");
            return false;
        } else if (validNamePattern.test(this.state.authorName) == false) {
            alert("Author Name start with caps and minimum has three character");
            return false;
        } else if (this.state.bookDetails.trim() == "") {
            alert("Description Should Not Be Blank");
            return false;
        } else if (this.state.bookImageSource.trim() == "") {
            alert("Book Cover Should Not Be Blank");
            return false;
        } else if (this.state.bookPrice.trim() == "") {
            alert("Book Price Should Not Be Blank");
            return false;
        } else if (validNumberPattern.test(this.state.bookPrice) == false) {
            alert("Book Price Should Be Greater Than Zero");
            return false;
        } else if (this.state.quantity.trim() == "") {
            alert("Quantity Should Not Be Blank");
            return false;
        } else if (validNumberPattern.test(this.state.quantity) == false) {
            alert("Quantity Should Be Greater Than Zero");
            return false;
        } else if (this.state.publishingYear.trim() == "") {
            alert("Publishing Year Should Not Be Blank");
            return false;
        } else if (publishingYearPattern.test(this.state.publishingYear) == false) {
            alert("Publishing Year Should Be Greater Than 999");
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
            return true;
        }
    }

    render() {
        return (
            <div>
                <AdminTopNavigationBar/>
                <div className="container">
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
                                       value={this.state.authorName} onChange={this.handleChange} name="authorName"/>
                            <TextField className="input" id="outlined-basic" label="Description" variant="outlined"
                                       value={this.state.bookDetails} onChange={this.handleChange} name="bookDetails"/>
                        </div>
                        <div className="data">
                            <TextField className="input" id="outlined-basic" label="Book Cover" variant="outlined"
                                       value={this.state.bookImageSource} onChange={this.handleChange}
                                       name="bookImageSource"/>
                            <TextField className="input" id="outlined-basic" label="Price" variant="outlined"
                                       value={this.state.bookPrice} onChange={this.handleChange} name="bookPrice"/>
                        </div>
                        <div className="data">
                            <TextField className="input" id="outlined-basic" label="Quantity" variant="outlined"
                                       value={this.state.quantity} onChange={this.handleChange} name="quantity"/>
                            <TextField className="input" id="outlined-basic" label="Publishing Year" variant="outlined"
                                       value={this.state.publishingYear} onChange={this.handleChange}
                                       name="publishingYear"/>
                        </div>
                        <div className="data">
                            <Button className="button" variant="contained" color="secondary"
                                    onClick={this.validation}>Add</Button>
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