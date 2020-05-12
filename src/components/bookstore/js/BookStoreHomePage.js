import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import '../css/BookStoreHomePage.css'
import CardView from "./CardView";
import BookStoreAxiosService from "../../../service/BookStoreAxiosService";
import Pagination from "@material-ui/lab/Pagination";

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails : [],
            pageValue : 0,
            totalBookCount : '',
            description : '',
            parentFlag : false,
            bookPerPage : 12
        }
    }

    displayBooks = () => {
        new BookStoreAxiosService().getBooksFromDatabase(this.state.pageValue)
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

    getBooksCount = () => {
        new BookStoreAxiosService().getCount().then((response) => {
            console.log(response.data);
            this.setState({totalBookCount : response.data})
        })
    }

    componentDidMount() {
        this.displayBooks();
        this.getBooksCount();
    }

    render() {
        return (
            <div className="container1">
                <NavigationBar/>
                <div className="count-and-filter-container">
                    <div className="count-and-filter">
                        <h2>Books<a className="book-count">({this.state.totalBookCount} items)</a></h2>
                    </div>
                </div>
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
                    <Pagination count={Math.ceil(this.state.totalBookCount/this.state.bookPerPage)} shape="rounded" onChange={this.handleChange} />
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }
}

export default BookStoreHomePage
