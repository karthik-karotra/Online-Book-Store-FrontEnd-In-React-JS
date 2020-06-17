import React from 'react';
import '../css/MyOrder.css';
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import {Link} from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";
import TrackOrder from '../js/TrackOrder';

class MyOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: []
        }
    }

    orderedBookDetails = () => {
        new OrderBookAxiosService().getOrderedBooks().then((response) => {
            if (response.data == "No Books Are Ordered Yet") {
                this.setState({bookDetails: []})
            } else {
                console.log(response.data.data)
                this.setState({bookDetails: response.data.data})
            }
        })
    }

    componentDidMount() {
        this.orderedBookDetails();
    }

    render() {
        return (
            <div className="order-wrapper">
                <NavigationBar/>
                <div className="order-body">
                    <div className="order-container">
                        <div className="order-breadcrumb">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" to="/">
                                    Home
                                </Link>
                                <Link color="inherit" href="#" style={{fontWeight: 'bold', color: "black"}}>
                                    My Orders
                                </Link>
                            </Breadcrumbs>
                        </div>

                        {this.state.bookDetails.map((bookDetails, index) =>
                            <div className="order-details-container">

                                <div className="my-order-date">
                                    <div className="my-order-details-date">Order Placed On {bookDetails.orderDate}</div>
                                </div>
                                {bookDetails.orderProduct.map((order, index) =>
                                    <div className="my-order">
                                        <div className="my-order-details">
                                            <div className="my-order-list">
                                                <div className="my-order-image">
                                                    <img className="images" src={order.book.bookImage}/>
                                                </div>
                                                <div className="my-order-description">
                                                    <div>
                                                        <div className="myorder-names">{order.book.bookName}</div>
                                                        <div
                                                            className="myorder-author-name">by {order.book.authorName}</div>
                                                    </div>
                                                    <div className="myorder-quantity">qty: {order.quantity}</div>
                                                    <div className="myorder-price">Rs. {order.book.bookPrice}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="my-track-order">
                                    <TrackOrder orderStatus={bookDetails.orderStatus}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="order-footer">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }
}

export default MyOrder;