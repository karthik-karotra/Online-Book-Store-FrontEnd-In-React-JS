import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import '../css/BookStoreHomePage.css'
import CardView from "./CardView";
import BookStoreAxiosService from "../../../service/BookStoreAxiosService";
import Pagination from "@material-ui/lab/Pagination";
import NativeSelect from "@material-ui/core/NativeSelect";

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            pageValue: 0,
            totalBookCount: '',
            description: '',
            parentFlag: false,
            bookPerPage: 12,
            searchText: '',
            searchValue: ' ',
            searchFlag: false,
            selectedSearchAndFilter: '',
            searchAndFilter: ["LOW_TO_HIGH","HIGH_TO_LOW","NEWEST_ARRIVALS"],
            searchAndFilterFlag: false
        }
    }

    displayBooks = () => {
        new BookStoreAxiosService().getBooksFromDatabase(this.state.pageValue)
            .then((response) => {
                console.log(response.data)
                this.setState({bookDetails: response.data.bookList}, () => {
                    this.getBooksCount()
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleChange = (event, value) => {
        if (this.state.searchAndFilterFlag === false) {
            this.setState({pageValue: value - 1}, () => {
                this.displayBooks()
                window.scrollTo(0, 0);
            })
        }
        if( this.state.searchAndFilterFlag === true){
            this.setState({pageValue: value - 1}, () => {
                this.displaySearchAndFilterBook()
            })
        }
    }

    getBooksCount = () => {
        new BookStoreAxiosService().getCount().then((response) => {
            console.log(response.data);
            this.setState({totalBookCount: response.data})
        })
    }

    sendSearchedText = (text) => {
        if (text === "") {
            this.setState({searchValue: ' '}, () => {
                this.displayBooks()
            })
        }
        if (text !== "") {
            this.setState({searchText: text, searchValue: text}, () => {
                this.displaySearchAndFilterBook();
            })
        }
    }

    handleFilter = (event) => {
        this.setState({selectedSearchAndFilter: event.target.value}, () => {this.displaySearchAndFilterBook()})
    }

    displaySearchAndFilterBook = () => {
        new BookStoreAxiosService().getSearchAndFilterBooks(this.state.pageValue, this.state.searchValue, this.state.selectedSearchAndFilter)
            .then((response) => {
                console.log(response.data)
                if (response.data == 'No Books For Searched String Were Found') {
                    this.setState({bookDetails: [], totalBookCount: 0})
                }
                else {
                    this.setState({bookDetails: response.data.content, totalBookCount: response.data.totalElements});
                }
            })
    }

    componentDidMount() {
        this.displayBooks();
        this.getBooksCount();
    }

    render() {
        return (
            <div className="container1">
                <NavigationBar getSearchedText={this.sendSearchedText}/>
                <div className="count-and-filter-container">
                    <div className="count-and-filter">
                        <div className="count">
                            <h2>Books<a className="book-count">({this.state.totalBookCount} items)</a></h2>
                        </div>
                        <div className="filterstyle">
                            <NativeSelect className="selectfield"
                                          id="demo-customized-select-native"
                                          onChange={this.handleFilter}
                                          onClick={this.handleFilter}
                                          value={this.state.selectedFilter}
                            >
                                <option aria-label="sort" selected value=" " >Sort by Relevance </option>
                                {this.state.searchAndFilter.map((data) => <option value={data}>{data}</option>)}
                            </NativeSelect>
                        </div>
                    </div>
                </div>
                <div id="tooltip" className={this.state.parentFlag === true ? 'visible' : 'hidden'}>
                    <div className="description">
                        <h2>Book Detail</h2>
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div className="flex-container-main">
                    <div className="flex-container">
                        {this.state.bookDetails.map(bookDetails => <CardView bookDetails={bookDetails}
                                                                             valueSender={this.getBookDetails}/>)}
                    </div>
                </div>
                <div className="pagination">
                    <Pagination count={Math.ceil(this.state.totalBookCount / this.state.bookPerPage)} shape="rounded"
                                onChange={this.handleChange}/>
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }
}

export default BookStoreHomePage
