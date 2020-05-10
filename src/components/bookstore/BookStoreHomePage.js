import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "./BookStoreFooter";
import './BookStoreHomePage.css'
import CardView from "./CardView";
import {getBooksFromDatabase} from "../../service/AxiosConfiguration";
import Pagination from "@material-ui/lab/Pagination";
import axios from 'axios';

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails : [],
            pageValue : 0
        }
    }

    displayBooks = () => {
        getBooksFromDatabase(this.state.pageValue)
            .then((response) => {
                this.setState({bookDetails: response.data.bookList});
            })
            .catch((error) => {console.log(error)});
    }

    handleChange = (event, value) => {
        this.setState({pageValue : value-1}, () => {this.displayBooks()})
    }

    componentDidMount() {
        this.displayBooks();
    }

    render() {
        return (
            <div className="container1">
                <NavigationBar/>
                <div className="flex-container">
                    {this.state.bookDetails.map(bookDetails => <CardView bookDetails={bookDetails}/> )}
                </div>
                <div className="pagination">
                    <Pagination count={10} shape="rounded" onChange={this.handleChange} />
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }
}

export default BookStoreHomePage
