import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import '../css/BookStoreHomePage.css'
import CardView from "./CardView";
import {getBooksFromDatabase} from "../../../service/BookStoreAxiosService";
import Pagination from "@material-ui/lab/Pagination";

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails : [],
            pageValue : 0,
            description : '',
            parentFlag : false
        }
    }

    displayBooks = () => {
        getBooksFromDatabase(this.state.pageValue)
            .then((response) => {
                console.log(response.data)
                this.setState({bookDetails: response.data.bookList});
            })
            .catch((error) => {console.log(error)});
    }

    handleChange = (event, value) => {
        this.setState({pageValue : value-1}, () => {this.displayBooks()})
    }

    getBookDetails = (getFlagValue, getDescription) => {
        this.setState({parentFlag : getFlagValue, description : getDescription})
    }

    componentDidMount() {
        this.displayBooks();
    }

    render() {
        return (
            <div className="container1">
                <NavigationBar/>
                <div id="tooltip" className={this.state.parentFlag === true ? 'visible' : 'hidden'}>
                    <div className="description">
                        <h2>Book Detail</h2>
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div className="flex-container">
                    {this.state.bookDetails.map(bookDetails => <CardView bookDetails={bookDetails} valueSender={this.getBookDetails} /> )}
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
