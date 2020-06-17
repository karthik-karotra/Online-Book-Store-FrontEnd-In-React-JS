import React, {Component} from 'react'
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import '../css/BookStoreHomePage.css'
import CardView from "./CardView";
import BookStoreAxiosService from "../../../service/BookStoreAxiosService";
import Pagination from "@material-ui/lab/Pagination";
import NativeSelect from "@material-ui/core/NativeSelect";
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";
import imagek from '../../../assests/images/booknotfound.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerDetailsAxiosService from "../../../service/CustomerDetailsAxiosService";

export class BookStoreHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            pageValue: 0,
            totalBookCount: '',
            bookPerPage: 12,
            searchText: '',
            searchValue: ' ',
            searchFlag: false,
            selectedSearchAndFilter: 'NEWEST_ARRIVALS',
            searchAndFilterFlag: false,
            cartDetails: [],
            isLoaded: false,
            userName: ''
        }
    }

    displayBooks = () => {
        new BookStoreAxiosService().getBooksFromDatabase(this.state.pageValue)
            .then((response) => {
                this.cartBookDetails()
                this.setState({bookDetails: response.data.data}, () => {
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
        if (this.state.searchAndFilterFlag === true) {
            this.setState({pageValue: value - 1}, () => {
                this.displaySearchAndFilterBook()
            })
        }
    }

    getBooksCount = () => {
        new BookStoreAxiosService().getCount().then((response) => {
            this.setState({totalBookCount: response.data, isLoaded: true})
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
        this.setState({selectedSearchAndFilter: event.target.value}, () => {
            this.displaySearchAndFilterBook()
        })
    }

    displaySearchAndFilterBook = () => {
        new BookStoreAxiosService().getSearchAndFilterBooks(this.state.pageValue, this.state.searchValue, this.state.selectedSearchAndFilter)
            .then((response) => {
                console.log(response.data)
                if (response.data == 'No Books For Searched String Were Found') {
                    this.setState({bookDetails: [], totalBookCount: 0})
                } else {
                    this.setState({bookDetails: response.data.content, totalBookCount: response.data.totalElements});
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
            console.log(response.data.data)
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

    getCustomerDetails() {
        new CustomerDetailsAxiosService().getCustomerDetails().then((response) => {
            console.log(response.data)
            if (response.data.message == "Response Successful") {
                this.setState({userName: response.data.data.fullName})
            } else {
                this.setState({userName: ""})
            }
        });
    }

    componentDidMount() {
        this.displayBooks();
        this.getBooksCount();
        this.getCustomerDetails();
    }

    render() {
        return (
            <div className="container1">
                <NavigationBar getSearchedText={this.sendSearchedText} count={this.state.cartDetails.length}
                               getFullName={this.state.userName}/>
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
                                <option aria-label="sort" selected value="">Sort by</option>
                                <option aria-label="sort" value="LOW_TO_HIGH">Price: Low To High</option>
                                <option aria-label="sort" value="HIGH_TO_LOW">Price: High To Low</option>
                                <option aria-label="sort" value="NEWEST_ARRIVALS">Newest Arrivals</option>
                            </NativeSelect>
                        </div>
                    </div>
                </div>
                <div className="flex-container-main">
                    <div className="flex-container">
                        {this.state.isLoaded == false ? <CircularProgress className="image-not-found"/> :
                            <div className="image-not-found"
                                 style={this.state.totalBookCount == 0 && this.state.isLoaded == true ? {visibility: "visible"} : {visibility: "hidden"}}>
                                <CardMedia className="media" image={imagek}/>
                            </div>
                        }
                        {this.state.bookDetails.map(bookDetails => <CardView bookDetails={bookDetails}
                                                                             cartDetails={this.state.cartDetails}
                                                                             saveBagDetails={this.getBagDetails}
                                                                             sendItemCount={this.updateCount}/>)}
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
 