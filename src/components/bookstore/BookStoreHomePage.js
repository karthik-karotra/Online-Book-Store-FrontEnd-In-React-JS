import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "./BookStoreFooter";
import './BookStoreHomePage.css'
import CardView from "./CardView";
import {getBooksFromDatabase} from "../../service/AxiosConfiguration";

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails : []
        }
    }

    displayBooks = () => {
        getBooksFromDatabase()
            .then((response) => {
                console.log(response.data);
                this.setState({bookDetails: response.data.bookList});
            })
            .catch((error) => {console.log(error)});
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
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }
}

export default BookStoreHomePage
