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
            severity: "",
            status1: false,
            status2: false,
            status3: false,
            status4: false,
            status5: false,
            status6: false,
            status7: false,
            status8: false,
            helpertext1: ' ',
            helpertext2: ' ',
            helpertext3: ' ',
            helpertext4: ' ',
            helpertext5: ' ',
            helpertext6: ' ',
            helpertext7: ' ',
            helpertext8: ' ',
            button11: ''
        }
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    reset =() =>{
        this.setState({
            isbn: "",
            bookName: "",
            authorName: "",
            bookPrice: "",
            quantity: "",
            bookDetails: "",
            bookImageSource: "",
            publishingYear: "",
        })
    }

    handleSubmmit = () => {
        if (this.state.isbn.trim() == "") {
            this.setState({
                status1: true,
                helpertext1: 'Required*'
            });
        }
        if (this.state.bookName.trim() == "") {
            this.setState({
                status2: true,
                helpertext2: 'Required*'
            });
        }
        if (this.state.authorName.trim() == "") {
            this.setState({
                status3: true,
                helpertext3: 'Required*'
            });
        }
        if (this.state.bookPrice.trim() == "") {
            this.setState({
                status4: true,
                helpertext4: 'Required*'
            });
        }
        if (this.state.quantity.trim() == "") {
            this.setState({
                status5: true,
                helpertext5: 'Required*'
            });
        }
        if (this.state.publishingYear.trim() == "") {
            this.setState({
                status6: true,
                helpertext6: 'Required*'
            });
        }
        if (this.state.bookImageSource.trim() == "") {
            this.setState({
                status7: true,
                helpertext7: 'Required*'
            });
        }
        if (this.state.bookDetails.trim() == "") {
            this.setState({
                status8: true,
                helpertext8: 'Required*'
            });
        }

        if (this.state.isbn.trim() != "" && this.state.bookName.trim() != "" && this.state.authorName.trim() != "" && this.state.bookPrice.trim() != "" && this.state.quantity.trim() != "" && this.state.publishingYear.trim() != "" && this.state.bookImageSource.trim() != "" && this.state.bookDetails.trim() != "") {
            if (this.state.status1 == false && this.state.status2 == false && this.state.status3 == false && this.state.status4 == false && this.state.status5 == false && this.state.status6 == false && this.state.status7 == false && this.state.status8 == false) {
                var path=`${this.state.bookImageSource}`;
                var newPath=`${path.replace("C:\\fakepath\\", "" )}`;
                newPath=`D:\\images\\${newPath}`
                const data = {
                    isbn: this.state.isbn,
                    bookName: this.state.bookName,
                    authorName: this.state.authorName,
                    bookPrice: this.state.bookPrice,
                    quantity: this.state.quantity,
                    bookDetails: this.state.bookDetails,
                    bookImageSource: newPath,
                    publishingYear: this.state.publishingYear
                }
                addBookToDatabase(data).then((response) => {
                    console.log(response.data);
                    if ( response.data.bookDetails != null) {
                        this.setState({
                            severity: "success",
                            snackbaropen: true,
                            snackbarmsg: response.data.message
                        },()=>{this.reset()});
                    } else {
                        this.setState({
                            severity: "error",
                            snackbaropen: true,
                            snackbarmsg: response.data.message
                        });
                    }
                })
                    .catch((error) => {console.log(error)})
            }
        }

    }


    handleChange = ({target}) => {
        if ([target.name] == "isbn") {
            this.setState({[target.name]: target.value},
                () => {
                    this.isbn()
                });
        }
        if ([target.name] == "bookName") {
            this.setState({[target.name]: target.value},
                () => {
                    this.bookName()
                });
        }
        if ([target.name] == "authorName") {
            this.setState({[target.name]: target.value},
                () => {
                    this.authorName()
                });
        }
        if ([target.name] == "bookPrice") {
            this.setState({[target.name]: target.value},
                () => {
                    this.bookPrice()
                });
        }
        if ([target.name] == "quantity") {
            this.setState({[target.name]: target.value},
                () => {
                    this.quantity()
                });
        }
        if ([target.name] == "publishingYear") {
            this.setState({[target.name]: target.value},
                () => {
                    this.publishingYear()
                });
        }
        if ([target.name] == "bookImageSource") {
            this.setState({[target.name]: target.value},
                () => {
                    this.bookImageSource()
                });
        }
        if ([target.name] == "bookDetails") {
            this.setState({[target.name]: target.value},
                () => {
                    this.bookDetails()
                });
        }
    };

    isbn() {
        this.setState({
            status1: true,
            helpertext1: 'Required*',
        })

        var isbnNumberPattern = /^([1-9]{1})([0-9]{3})$/;
        this.setState({
            isbn: this.state.isbn.trim()
        })
        if (this.state.isbn.trim() != "") {
            if (isbnNumberPattern.test(this.state.isbn) == false) {
                this.setState({
                    status1: true,
                    helpertext1: 'Should Be 4 Digit Number',
                })
            } else {
                this.setState({
                    status1: false,
                    helpertext1: '',
                })
            }
        }

    }

    bookName() {
        this.setState({
            status2: true,
            helpertext2: 'Required*',
        })
        var validNamePattern = /^.{3,25}$/;
        if (this.state.bookName.trim() != "") {
            if (validNamePattern.test(this.state.bookName) == false) {
                this.setState({
                    status2: true,
                    helpertext2: 'Min 2 characters & max 24 characters',
                })
            } else {
                this.setState({
                    status2: false,
                    helpertext2: '',
                })
            }
        }
    }

    authorName() {
        this.setState({
            status3: true,
            helpertext3: 'Required*',
        })
        var validNamePattern = /^([a-zA-Z]{3,}[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*)$/;
        if (this.state.authorName.trim() != "") {
            if (validNamePattern.test(this.state.authorName) == false) {
                this.setState({
                    status3: true,
                    helpertext3: 'Min 2 characters',
                })
            } else {
                this.setState({
                    status3: false,
                    helpertext3: '',
                })
            }
        }
    }

    bookPrice() {
        this.setState({
            status4: true,
            helpertext4: 'Required*',
        })
        var validNumberPattern = /^([1-9]{1,})([0-9]*)$/;
        this.setState({
            bookPrice: this.state.bookPrice.trim()
        })

        if (this.state.bookPrice.trim() != "") {
            if (validNumberPattern.test(this.state.bookPrice) == false) {
                this.setState({
                    status4: true,
                    helpertext4: 'Should Be Greater Than Zero',
                })
            } else {
                this.setState({
                    status4: false,
                    helpertext4: '',
                })
            }
        }
    }

    quantity() {
        this.setState({
            status5: true,
            helpertext5: 'Required*',
        })
        var validNumberPattern = /^([1-9]{1,})([0-9]*)$/;
        this.setState({
            quantity: this.state.quantity.trim()
        })

        if (this.state.quantity.trim() != "") {
            if (validNumberPattern.test(this.state.quantity) == false) {
                this.setState({
                    status5: true,
                    helpertext5: 'Should Be Greater Than Zero',
                })
            } else {
                this.setState({
                    status5: false,
                    helpertext5: '',
                })
            }
        }
    }

    publishingYear() {
        this.setState({
            status6: true,
            helpertext6: 'Required*',
        })
        var publishingYearPattern = /^([1-9]{1})([0-9]{3})$/;
        this.setState({
            publishingYear: this.state.publishingYear.trim()
        })

        if (this.state.publishingYear.trim() != "") {
            if (publishingYearPattern.test(this.state.publishingYear) == false) {
                this.setState({
                    status6: true,
                    helpertext6: 'Should Be Greater Than 999',
                })
            } else {
                this.setState({
                    status6: false,
                    helpertext6: '',
                })
            }
        }
    }

    bookImageSource() {

        if (this.state.bookImageSource.trim() !== "") {
            this.setState({
                status7: false,
                helpertext7: '',
            })
        } else {
            this.setState({
                status7: true,
                helpertext7: 'Required*',
            })
        }
    }

    bookDetails() {
        if (this.state.bookDetails.trim() != "") {
            this.setState({
                status8: false,
                helpertext8: '',
            })
        } else {
            this.setState({
                status8: true,
                helpertext8: 'Required*',
            })
        }
        var validDescriptionPattern = /^.{0,251}$/;
        if (this.state.bookDetails.trim() != "") {
            if (validDescriptionPattern.test(this.state.bookDetails) == false) {
                this.setState({
                    status8: true,
                    helpertext8: 'Maximum 250 Characters',
                })
            } else {
                this.setState({
                    status8: false,
                    helpertext8: '',
                })
            }
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
                            <h2>Book Details</h2>
                        </div>
                        <div className="data">
                            <TextField error={this.state.status1} className="input" id="outlined-basic" label="ISBN No."
                                       variant="outlined" autoComplete="off"
                                       helperText={this.state.helpertext1} value={this.state.isbn}
                                       onClick={this.handleChange} onChange={this.handleChange} name="isbn"/>

                            <TextField error={this.state.status2} className="input" id="outlined-basic"
                                       label="Book Name" variant="outlined" autoComplete="off"
                                       value={this.state.bookName} helperText={this.state.helpertext2}
                                       onClick={this.handleChange} onChange={this.handleChange} name="bookName"/>
                        </div>
                        <div className="data">
                            <TextField error={this.state.status3} className="input" id="outlined-basic"
                                       label="Author Name" variant="outlined" autoComplete="off"
                                       value={this.state.authorName} helperText={this.state.helpertext3}
                                       onClick={this.handleChange} onChange={this.handleChange}
                                       name="authorName"/>


                            <TextField error={this.state.status4} className="input" id="outlined-basic" label="Price"
                                       variant="outlined" autoComplete="off"
                                       value={this.state.bookPrice} helperText={this.state.helpertext4}
                                       onClick={this.handleChange} onChange={this.handleChange} name="bookPrice"/>
                        </div>
                        <div className="data">
                            <TextField error={this.state.status5} className="input" id="outlined-basic" label="Quantity"
                                       variant="outlined" autoComplete="off"
                                       value={this.state.quantity} helperText={this.state.helpertext5}
                                       onClick={this.handleChange} onChange={this.handleChange} name="quantity"/>
                            <TextField error={this.state.status6} className="input" id="outlined-basic"
                                       label="Publishing Year"
                                       variant="outlined" autoComplete="off"
                                       value={this.state.publishingYear} helperText={this.state.helpertext6}
                                       onClick={this.handleChange} onChange={this.handleChange}
                                       name="publishingYear"/>
                        </div>
                        <div className="data2">
                            <TextField error={this.state.status7} helperText={this.state.helpertext7} className="input" id="outlined-basic" label="" variant="outlined"
                                       value={this.state.bookImageSource} type="file" accept="file_extension|image/*"  onClick={this.handleChange} onChange={this.handleChange}
                                       name="bookImageSource"/>
                        </div>
                        <div className="data2">
                            <TextField error={this.state.status8} helperText={this.state.helpertext8} className="input"
                                       id="outlined-multiline-flexible" label="Description"
                                       placeholder="Maximum 250 Characters"  multiline rowsMax={2} variant="outlined"
                                       value={this.state.bookDetails} onClick={this.handleChange}
                                       onChange={this.handleChange}
                                       name="bookDetails"/>
                        </div>
                        <div className="data">
                            <Button className="button" variant="contained"
                                    onClick={this.handleSubmmit} style={{backgroundColor: "rgb(145,10,10)"}}>
                                <div className="buttonfont">Add Book</div>
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