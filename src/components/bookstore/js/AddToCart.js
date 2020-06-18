import React from 'react';
import './../css/AddToCart.css';
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import Button from "@material-ui/core/Button";
import MyCart from "./MyCart";
import OrderSummary from "./OrderSummary";
import CustomerDetails from "./CustomerDetails";
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";
import CustomerDetailsAxiosService from "../../../service/CustomerDetailsAxiosService";
import {Link} from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {withRouter} from 'react-router';


class AddToCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setButtonVisibility: 'visible',
            setFormVisibility: 'customer-form-disable',
            setOrderSummaryContainerVisibility: 'books-disable',
            setOrderSummaryButtonVisibility: 'place-order-button-disable',
            setPriceVisibility: 'coupon-disable',
            bookDetails: [],
            totalPrice: 0,
            customerDetails: [],
            customerData: [],
            operatorSetDisable: false,
            orderID: '', random: 0,
        }
    }

    handlePlaceOrder = () => {
        this.setState({setButtonVisibility: 'disable', setFormVisibility: 'customer-form', operatorSetDisable: true})
        new CustomerDetailsAxiosService().getCustomerDetails().then((response) => {
            this.setState({customerDetails: response.data.data})
        });
        this.cartBookDetails();
    }

    cartBookDetails = () => {
        new OrderBookAxiosService().myCart().then((response) => {
            if (response.data == "No Books Found In Cart") {
                this.setState({bookDetails: []})
            } else {
                this.setState({bookDetails: response.data.data}, () => console.log(this.state.bookDetails))
            }
        })
    }

    updateOrderSummary = () => {
        this.setState({
            setOrderSummaryContainerVisibility: 'books',
            setOrderSummaryButtonVisibility: 'place-order-button',
            setPriceVisibility: 'coupon'
        })
    }

    sendCustomerDetails = (address, cityTown, landmark, locality, pinCode, radioDefaultValue) => {
        const data1 = {
            address: address,
            city: cityTown,
            landmark: landmark,
            locality: locality,
            pincode: pinCode,
            type: radioDefaultValue.toUpperCase()
        }
        this.setState({customerData: data1})
        this.setTotalPrice();
    }

    setTotalPrice = () => {

        let price = this.state.bookDetails.map((books, index) => {
            return (books.book.bookPrice * books.quantity)
        });
        this.state.totalPrice = price.reduce((a, b) => a + b)
    }

    handleCheckout = () => {
        new CustomerDetailsAxiosService().setCustomerDetails(this.state.customerData).then(response => {
            new OrderBookAxiosService().placeOrder(this.state.discountCouponPrice, this.state.coupon).then(response => {
                this.setState({
                    orderID: response.data.data
                }, () => this.props.history.push(`/successfull/${this.state.orderID}`))
            });
        })
    }


    callDisplayCartBooks = () => {
        this.cartBookDetails();
    }

    componentDidMount() {
        if (localStorage.getItem('token') != null && localStorage.getItem('data') != null) {
            this.cartBookDetails();
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <NavigationBar/>
                <div className="cart-body">
                    <div className="cart-container">
                        <div className="breadcrumbs">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/">
                                    Home
                                </Link>
                                <Link color="inherit" href="#" style={{fontWeight: 'bold', color: "black"}}>
                                    My cart
                                </Link>
                            </Breadcrumbs>
                        </div>
                        <div className="cart">
                            <div className="header">
                                <h3>My Cart({this.state.bookDetails.length})</h3>
                            </div>
                            <div className={this.state.bookDetails.length <= 2 ? 'books' : 'books-scrollbar'}>
                                {this.state.bookDetails.length === 0 ?
                                    <div>
                                        <div className="empty-cart">
                                            <img className="empty-cart-image"
                                                 src={require("../../../assests/images/NoItem.jpg")}
                                                 alt="Cart Is Empty"/>
                                        </div>
                                    </div>
                                    :
                                    this.state.bookDetails.map(bookDetails =>
                                        <div className="book-details">
                                            <MyCart bookDetails={bookDetails} quantityVisibility="quantity-visible"
                                                    callDisplay={this.callDisplayCartBooks}
                                                    disableOperator={this.state.operatorSetDisable}/>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="place-order-button">
                                <Button variant="contained" color="primary" className={this.state.setButtonVisibility}
                                        style={this.state.bookDetails.length === 0 ? {visibility: "hidden"} : {}}
                                        onClick={this.handlePlaceOrder}>Continue</Button>
                            </div>
                        </div>
                        <div className="customer-details">
                            <div className="header"><h3>Customer Details</h3></div>
                            <div className={this.state.setFormVisibility}>
                                <CustomerDetails customerDetails={this.state.customerDetails}
                                                 setOrderSummaryDisplayFlag={this.updateOrderSummary}
                                                 getMeCustumerDetails={this.sendCustomerDetails}/>
                            </div>
                        </div>
                        <div className="order-summary">
                            <div className="header"><h3>Order Summary</h3></div>
                            <div
                                className={this.state.setOrderSummaryContainerVisibility === 'books-disable' ? 'books-disable' : this.state.bookDetails.length <= 2 ? 'books' : 'books-scrollbar'}>
                                {this.state.bookDetails.map(bookDetails =>
                                    <div className="book-details">
                                        <OrderSummary bookDetails={bookDetails}/>
                                    </div>
                                )}
                            </div>
                            <div className={this.state.setOrderSummaryButtonVisibility}>
                                <Button variant="contained" color="primary" className='visible'
                                        onClick={this.handleCheckout}>
                                    Place Order
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-footer">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }

}

export default withRouter(AddToCart);