import React from 'react';
import './../css/AddToCart.css';
import Button from '@material-ui/core/Button'
import ak from './image/ak.png'
import CustomerDetails from './CustomerDetails';

class AddToCart extends React.Component {
    render() {
        return (
            <div className="flex-container-main">
                <div className="flex-container">
                    <div className="card1">
                        <div className="myCart">My Cart</div>
                        <div className="div1">
                            <div className="div1a">
                                <img src={ak} alt="img" className="image" />
                            </div>
                            <div className="div1b">
                                <div className="bookName">Don't make me think</div>
                                <div className="authorName">any...</div>
                                <div className="price">Rs.1500</div>
                            </div>
                        </div>
                        <Button style={{ marginLeft: '600px' }} variant="contained" color="primary" className="placeOrder">Place Order</Button>
                    </div >
                    <div className="card2">
                        <h4 style={{ marginLeft: '40px' }}>Customer Details</h4>
                        <div>
                            <CustomerDetails />
                        </div>
                    </div>
                    <div className="card3">
                        <h4 style={{ marginLeft: '40px' }}>Order Summary </h4>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddToCart;