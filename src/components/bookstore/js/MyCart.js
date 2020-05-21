import React from "react";
import '../css/MyCart.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

class MyCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantityValue: 1
        }
    }

    decrement = () => {
        if (this.state.quantityValue >= 2)
        this.setState({ quantityValue: this.state.quantityValue-1 })
    }

    increment = () => {
        this.setState({ quantityValue: this.state.quantityValue+1 })
    }

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
                    <div className="quantity">
                        <div className="increment-decrement">
                            <button className="minus-plus" onClick={this.decrement}><RemoveCircleOutlineIcon /></button>
                            <input type="number" className="number" value={this.state.quantityValue} />
                            <button className="minus-plus" onClick={this.increment}><AddCircleOutlineIcon /></button>
                            <button className="remove">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MyCart;