import React from "react";
import '../css/MyCart.css';

class OrderSummary extends React.Component {

    render() {
        return (
            <div className="details">
                <div className="book-image">
                    <div className="image">
                        <img src={this.props.bookDetails.book.bookImage} alt="img" className="image"/>
                    </div>
                </div>
                <div className="book-description">
                    <div className="book-name">{this.props.bookDetails.book.bookName}</div>
                    <div className="author-name">by {this.props.bookDetails.book.authorName}</div>
                    <div
                        className="price">Rs. {this.props.bookDetails.book.bookPrice * this.props.bookDetails.quantity}</div>
                </div>
            </div>
        );
    }

}

export default OrderSummary;