import React, {Component} from 'react'
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import '../css/BookStoreHomePage.css'
import CardView from "./CardView";
import BookStoreAxiosService from "../../../service/BookStoreAxiosService";
import Pagination from "@material-ui/lab/Pagination";
import NativeSelect from "@material-ui/core/NativeSelect";
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";
import NoResultFound from "../../../assests/images/NoResultFound.jpg"

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            pageValue: 1,
            totalBookCount: '',
            bookPerPage: 12,
            searchText: '',
            searchValue: ' ',
            searchFlag: false,
            selectedSearchAndFilter: 'NEWEST_ARRIVALS',
            searchAndFilterFlag: false,
            cartDetails: [],
            isLoaded: false,
            setPaginationVisibility: 'pagination-disable',
            setFilterVisibility: 'filterstyle-disable'
        }
    }

    displayBooks = () => {
        new BookStoreAxiosService().getBooksFromDatabase(this.state.pageValue)
            .then((response) => {
                if (response.data === "No Books Were Found On The Page") {
                    this.setState({
                        bookDetails: [],
                        setPaginationVisibility: 'pagination-disable',
                        setFilterVisibility: 'filterstyle-disable'
                    });
                } else {
                    this.cartBookDetails()
                    this.setState({
                        bookDetails: response.data.data,
                        setPaginationVisibility: 'pagination',
                        setFilterVisibility: 'filterstyle'
                    }, () => {
                        this.getBooksCount()
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    handleChange = (event, value) => {
        if (this.state.searchAndFilterFlag === false) {
            this.setState({pageValue: value}, () => {
                this.displayBooks()
                window.scrollTo(0, 0);
            })
        }
        if (this.state.searchAndFilterFlag === true) {
            this.setState({pageValue: value}, () => {
                this.displaySearchAndFilterBook()
            })
        }
    }

    getBooksCount = () => {
        new BookStoreAxiosService().getCount().then((response) => {
            this.setState({totalBookCount: response.data.data, isLoaded: true})
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
        this.setState({
            selectedSearchAndFilter: event.target.value,
            searchAndFilterFlag: true
        }, () => {
            this.displaySearchAndFilterBook()
        })
    }

    displaySearchAndFilterBook = () => {
        new BookStoreAxiosService().getSearchAndFilterBooks(this.state.pageValue, this.state.searchValue, this.state.selectedSearchAndFilter)
            .then((response) => {
                if (response.data == 'No Books For Searched String Were Found') {
                    this.setState({
                        bookDetails: [],
                        totalBookCount: 0,
                        setPaginationVisibility: 'pagination-disable',
                        setFilterVisibility: 'filterstyle-disable'
                    })
                } else {
                    this.setState({
                        bookDetails: response.data.data.content,
                        totalBookCount: response.data.data.totalElements,
                        setPaginationVisibility: 'pagination',
                        setFilterVisibility: 'filterstyle'
                    });
                }
            })
    }

    getBagDetails = (bookid) => {
        const data = {
            bookId: bookid,
            quantity: 1
        }
        new OrderBookAxiosService().setBagBookDetails(data).then(() => {
            this.displayBooks()
        })
    }

    cartBookDetails = () => {
        new OrderBookAxiosService().myCart().then((response) => {
            if (response.data == "No Books Found In Cart") {
                this.setState({cartDetails: []})
            } else {
                this.setState({cartDetails: response.data.data});
            }
        })
    }

    updateCount = () => {
        this.cartBookDetails();
    }

    componentDidMount() {
        this.displayBooks();
        this.getBooksCount();
    }

    render() {
        return (

            this.state.isLoaded === false ?
                <div><NavigationBar getSearchedText={this.sendSearchedText} count={this.state.cartDetails.length}/>
                    <div className="wrapper-loader">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <span>Loading...</span>
                    </div>
                </div>
                :
                <div className="container1">
                    <NavigationBar getSearchedText={this.sendSearchedText} count={this.state.cartDetails.length}/>
                    <div className="count-and-filter-container">
                        <div className="count-and-filter">
                            <div className="count">
                                <h2>Books<a className="book-count">({this.state.totalBookCount} items)</a></h2>
                            </div>
                            <div className={this.state.setFilterVisibility}>
                                <NativeSelect className="selectfield"
                                              id="demo-customized-select-native"
                                              onChange={this.handleFilter}
                                              onClick={this.handleFilter}
                                              value={this.state.selectedFilter}
                                >
                                    <option aria-label="sort" selected value="NEWEST_ARRIVALS">Sort by</option>
                                    <option aria-label="sort" value="LOW_TO_HIGH">Price: Low To High</option>
                                    <option aria-label="sort" value="HIGH_TO_LOW">Price: High To Low</option>
                                    <option aria-label="sort" value="NEWEST_ARRIVALS">Newest Arrivals</option>
                                </NativeSelect>
                            </div>
                        </div>
                    </div>
                    {this.state.bookDetails.length === 0 ?
                        <div className="no-result-found">
                            <div className="no-result">
                                <img src={NoResultFound} height="100%" width="100%"/>
                            </div>
                        </div>
                        :
                        <div className="flex-container-main">
                            <div className="flex-container">
                                {this.state.bookDetails.map(bookDetails => <CardView bookDetails={bookDetails}
                                                                                     cartDetails={this.state.cartDetails}
                                                                                     saveBagDetails={this.getBagDetails}
                                                                                     sendItemCount={this.updateCount}/>)}
                            </div>
                        </div>
                    }

                    <div className={this.state.setPaginationVisibility}>
                        <Pagination count={Math.ceil(this.state.totalBookCount / this.state.bookPerPage)}
                                    shape="rounded"
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
 