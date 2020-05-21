import React from 'react';
import './../css/AddToCart.css';
import Button from '@material-ui/core/Button'
import CustomerDetails from './CustomerDetails';
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import MyCart from "./MyCart";
import OrderSummary from "./OrderSummary";

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            setButtonVisibility: 'visible',
            setFormVisibility: 'customer-form-disable',
            setOrderSummaryContainerVisibility: 'books-disable',
            setOrderSummaryButtonVisibility: 'place-order-button-disable'
        }
    }

    handlePlaceOrder = () => {
        this.setState({setButtonVisibility: 'disable', setFormVisibility: 'customer-form'})
    }

    updateOrderSummary = () => {
        this.setState({ setOrderSummaryContainerVisibility: 'books', setOrderSummaryButtonVisibility: 'place-order-button' })
    }

    render() {
        return (
            <div className="wrapper">
                <NavigationBar />
                <div className="cart-body">
                    <div className="cart-container">
                        <div className="cart">
                            <div className="header">
                                <h3>My Cart(2)</h3>
                            </div>
                            <div className="books">
                                    <div className="book-details">
                                        <MyCart />
                                    </div>
                            </div>
                            <div className="place-order-button">
                                <Button variant="contained" color="primary" className={this.state.setButtonVisibility} onClick={this.handlePlaceOrder}>Place Order</Button>
                            </div>
                        </div>
                        <div className="customer-details">
                            <div className="header"><h3>Customer Details</h3></div>
                            <div className={this.state.setFormVisibility}>
                                <CustomerDetails setOrderSummaryDisplayFlag={this.updateOrderSummary} />
                            </div>
                        </div>
                        <div className="order-summary">
                            <div className="header"><h3>Order Summary</h3></div>
                            <div className={this.state.setOrderSummaryContainerVisibility}>
                                    <div className="book-details">
                                        <OrderSummary />
                                    </div>
                            </div>
                            <div className={this.state.setOrderSummaryButtonVisibility}>
                                <Button variant="contained" color="primary" className='visible'>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-footer">
                    <BookStoreFooter/>
                </div>
            </div>
        );
    }
}
export default AddToCart;