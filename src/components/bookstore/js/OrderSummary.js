import React from "react";
import '../css/MyCart.css'

class OrderSummary extends React.Component {

    render() {
        return (
            <div className="details">
                <div className="book-image">
                    <div className="image">
                        <img src={require(`../../../assests/images/1-world-best-bf.jpg`)} alt="img" className="image" />
                    </div>
                </div>
                <div className="book-description">
                    <div className="book-name">Book Name</div>
                    <div className="author-name">by Author Name</div>
                    <div className="price">Rs. 1500</div>
                </div>
            </div>
        );
    }

}

export default OrderSummary;