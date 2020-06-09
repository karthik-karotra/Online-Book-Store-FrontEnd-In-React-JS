import React from 'react';
import './../css/AddToCart.css';
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import Button from "@material-ui/core/Button";
import MyCart from "./MyCart";
import CustomerDetails from "./CustomerDetails";
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";
import CustomerDetailsAxiosService from "../../../service/CustomerDetailsAxiosService";
import {Link} from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


class AddToCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setButtonVisibility: 'visible',
            setFormVisibility: 'customer-form-disable',
            setOrderSummaryContainerVisibility: 'books-disable',
            setOrderSummaryButtonVisibility: 'place-order-button-disable',
            setPriceVisibility: 'total-price-disable',
            bookDetails: [],
            totalPrice: 0,
            customerDetails: [],
            customerData: [],
            operatorSetDisable: false
        }
    }

    handlePlaceOrder = () => {
        this.setState({setButtonVisibility: 'disable', setFormVisibility: 'customer-form', operatorSetDisable:true})
        new CustomerDetailsAxiosService().getCustomerDetails().then((response) => {
            console.log(response.data)
            this.setState({customerDetails: response.data.data})
        });
    }

    cartBookDetails = () => {
        new OrderBookAxiosService().myCart().then((response) => {
            console.log(response.data.data)
            if (response.data == "No Books Found In Cart") {
                this.setState({bookDetails: []})
            } else {
                this.setState({ bookDetails: response.data.data})
            }
        })
    }

    updateOrderSummary = () => {
        this.setState({ setOrderSummaryContainerVisibility: 'books', setOrderSummaryButtonVisibility: 'place-order-button', setPriceVisibility: 'total-price' })
    }

    sendCustomerDetails = (address,cityTown,landmark,locality,pinCode,radioDefaultValue) =>{
        const data1 = {
            address: address,
            city: cityTown,
            landmark: landmark,
            locality: locality,
            pincode:pinCode,
            type: radioDefaultValue.toUpperCase()
        }
        console.log(data1)
        this.setState({customerData: data1})
        this.cartBookDetails();
        this.setTotalPrice();
        console.log(this.state.totalPrice)
    }

    handleCheckout = () => {
        new CustomerDetailsAxiosService().setCustomerDetails(this.state.customerData).then(response => { 
            console.log(response)
            new OrderBookAxiosService().placeOrder().then(response => {
                console.log(response.data)
            });
        })
        .catch(error => {
            console.log(error)
        });
        
    }

    setTotalPrice = () => {
        let price = this.state.bookDetails.map((books, index) => {
            return (books.book.bookPrice * books.quantity)
        });
        this.state.totalPrice = price.reduce((a, b) => a+b)
    }

    callDisplayCartBooks=()=>{
        this.cartBookDetails();
    }

    componentDidMount() {
        this.cartBookDetails();
    }

    render() {
        return (
            <div className="wrapper">
                <NavigationBar />
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
                                            <img className="empty-cart-image" src={require("../../../assests/images/NoItem.jpg")}
                                            alt="Cart Is Empty"/>
                                        </div>
                                    </div>
                                    :
                                    this.state.bookDetails.map(bookDetails =>
                                    <div className="book-details">
                                        <MyCart bookDetails={bookDetails} quantityVisibility="quantity-visible" callDisplay={this.callDisplayCartBooks} disableOperator={this.state.operatorSetDisable} />
                                    </div>
                                    ) 
                                }
                            </div>
                            <div className="place-order-button">
                                <Button variant="contained" color="primary" className={this.state.setButtonVisibility} style={this.state.bookDetails.length === 0 ? {visibility: "hidden"} : {}} onClick={this.handlePlaceOrder}>Continue</Button>
                            </div>
                        </div>
                        <div className="customer-details">
                            <div className="header"><h3>Customer Details</h3></div>
                            <div className={this.state.setFormVisibility}>
                                <CustomerDetails customerDetails={this.state.customerDetails} setOrderSummaryDisplayFlag={this.updateOrderSummary} getMeCustumerDetails={this.sendCustomerDetails}/>
                            </div>
                        </div>
                        <div className="order-summary">
                            <div className="header"><h3>Order Summary</h3></div>
                            <div className={this.state.setOrderSummaryContainerVisibility === 'books-disable' ? 'books-disable' : this.state.bookDetails.length <= 2 ? 'books' : 'books-scrollbar' }>
                                {this.state.bookDetails.map(bookDetails =>
                                    <div className="book-details">
                                        <MyCart bookDetails={bookDetails} quantityVisibility="quantity-hidden" />
                                    </div>
                                )}
                            </div>
                            <div className={this.state.setOrderSummaryButtonVisibility}>
                            <p className={this.state.setPriceVisibility}>Subtotal ({this.state.bookDetails.length} items): Rs. {this.state.totalPrice}</p>
                            <Link to="/successfull" style={{textDecoration: 'none'}}><Button variant="contained" color="primary" className='visible' onClick={this.handleCheckout}>Place Order</Button></Link>
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
export default AddToCart;