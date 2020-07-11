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
import Divider from "@material-ui/core/Divider";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Coupon from './Coupon.js'
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
            visibilityOfDialogBox: false,
            discountTotal: "",
            discountCouponPrice: 0,
            coupons: [],
            couponStatus: "",
            couponPrice: 0,
            coupon: "",
            index: 0, orderID: '', random: 0,
        }
    }

    getCoupon = () => {
        this.setState({visibilityOfDialogBox: true})
    }

    handleClose = () => {
        this.setState({visibilityOfDialogBox: false})
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
        this.discountCoupon();
    }

    setTotalPrice = () => {

        let price = this.state.bookDetails.map((books, index) => {
            return (books.book.bookPrice * books.quantity)
        });
        this.state.totalPrice = price.reduce((a, b) => a + b)
        this.setState({
            discountCouponPrice: this.state.totalPrice
        })
    }

    handleCheckout = () => {
        new CustomerDetailsAxiosService().setCustomerDetails(this.state.customerData).then(response => {
            new OrderBookAxiosService().placeOrder(this.state.discountCouponPrice, this.state.coupon).then(response => {
                this.setState({
                    orderID: response.data.data
                }, () => this.props.history.push(`/successfull/${this.state.orderID}`))
            });
        })
        this.addCoupon();
    }


    callDisplayCartBooks = () => {
        this.cartBookDetails();
    }

    discountCoupon = () => {
        new OrderBookAxiosService().getCoupons(this.state.totalPrice).then(response => {
            if (response.data.message === "Coupons Fetched Successfully") {
                this.setState({
                    coupons: response.data.data
                })
            } else {
                this.setState({
                    coupons: []
                })
            }
        })
    }

    addCoupon = () => {
        new OrderBookAxiosService().addDiscountPrice(this.state.coupon, this.state.totalPrice).then(response => {
            if (response.data.data == 0) {
                this.setState({
                    discountCouponPrice: response.data.data == 0 ? this.state.totalPrice : response.data.data
                })
            }
        })
    }

    handleTotalPrice = (data, status, price, index) => {
        this.setState({
            visibilityOfDialogBox: false,
            coupon: data,
            couponStatus: status,
            couponPrice: price,
            discountCouponPrice: (this.state.totalPrice - price) < 0 ? 0 : this.state.totalPrice - price,
            index: index
        })
    }

    handleCancel = () => {
        this.setState({visibilityOfDialogBox: false});
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

                            <div className={this.state.setPriceVisibility}>
                                <div className="coupon-container">

                                    <Divider/>
                                    <div className="coupon-div">
                                        <b>Coupons</b>
                                        <div className="coupon-div1">
                                            <LocalOfferOutlinedIcon id="offer-icon"/>
                                            {this.state.couponStatus === "applied" ?
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">1 Coupon Applied</p>
                                                    <Button id="coupon-apply-btn" onClick={this.getCoupon}>Edit</Button>
                                                </div>
                                                :
                                                <div className="coupon-div1-sub">
                                                    <p className="coupon-sub-title">Apply Coupons</p>
                                                    <Button id="coupon-apply-btn"
                                                            onClick={this.getCoupon}>Apply</Button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="discount-container">
                                        <p><b>Price details</b></p>
                                        <div className="subtotalprice">
                                            <div className="discount-price">Sub Total Price:</div>
                                            <div className="price-tag">Rs. {this.state.totalPrice}</div>
                                        </div>
                                        <div className="subtotalprice">
                                            <div className="discount-price">Discount Price:</div>
                                            <div className="price-tag">Rs. {this.state.couponPrice}</div>
                                        </div>
                                        <hr className="horizontal-line"/>
                                        <div className="subtotalprice">
                                            <div className="discount-price"><b>Total Price:</b></div>
                                            <div className="price-tag"><b>Rs. {this.state.discountCouponPrice}</b></div>
                                        </div>
                                    </div>

                                </div>
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

                <Dialog className="coupon-dialog-box" aria-labelledby="customized-dialog-title"
                        open={this.state.visibilityOfDialogBox} onClose={this.handleClose}>
                    <DialogContent id="dialoguecontent" id="customized-dialog-title">
                        <Coupon coupons={this.state.coupons} totalPrice={this.state.totalPrice}
                                handleTotalPrice={this.handleTotalPrice} handleDialogVisibility={this.handleCancel}
                                index={this.state.index}/>
                    </DialogContent>
                </Dialog>

            </div>
        )
    }

}

export default withRouter(AddToCart);