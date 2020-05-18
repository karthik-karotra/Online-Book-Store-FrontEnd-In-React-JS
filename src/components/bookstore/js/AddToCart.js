import React from 'react';
import './../css/AddToCart.css';
import Button from '@material-ui/core/Button'
import ak from '../../../assests/images/1-world-best-bf.jpg'
import CustomerDetails from './CustomerDetails';
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            myClassName:'cust-details',
            myClassName2:'placeOrder1'
        }
    }
    handlePlaceOrder=()=>{
        this.setState({myClassName:'cust-details2',
        myClassName2:'placeOrder2'
        })
    }
    render() {
        return (
            <div className="header">
                <NavigationBar />
            <div className="card-container-main">
                <div className="card-container">
                    <div className="first-cart">
                        <div className="myCart">My Cart (2)</div>
                        <div className="main-division">
                            <div className="subdivision-img">
                                <img src={ak} alt="img" className="image" />
                            </div>
                            <div className="subdivision-details">
                                <div className="bookName">Don't make me think</div>
                                <div className="authorName">any...</div>
                                <div className="price">Rs.1500</div>
                            </div>
                        </div>
                        <Button style={{ marginLeft: '600px' }} variant="contained" color="primary" className={this.state.myClassName2} onClick={this.handlePlaceOrder}>Place Order</Button>
                    </div >
                    <div className="second-cart">
                        <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Customer Details</h3>
                        <div className={this.state.myClassName}>
                            <CustomerDetails />
                        </div>
                    </div>
                    <div className="third-cart">
                        <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Order Summary </h3>
                    </div>
                </div>
            </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        );
    }
}
export default AddToCart;