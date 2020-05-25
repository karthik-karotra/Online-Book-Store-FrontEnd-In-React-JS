import React from "react";
import '../css/MyCart.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import OrderBookAxiosService from "../../../service/OrderBookAxiosService";

class MyCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantityValue: this.props.bookDetails.quantity
        }
    }

    increment = () =>{
        this.setState({quantityValue: this.state.quantityValue+1}, () => {this.updateQuantity()} )
    }

    decrement = () =>{
        this.setState({quantityValue:this.state.quantityValue-1}, () => {this.updateQuantity()} )
    }

    handleRemove=()=>{
        new OrderBookAxiosService().deleteBooksFromCartDatabase(this.props.bookDetails.bookCartID).then((response) => {
            this.props.callDisplay();
        })
            .catch((error) => {
                console.log(error)
            });
    }

    updateQuantity = () => {
        console.log(this.props.bookDetails.bookCartID+" "+this.state.quantityValue)
        new OrderBookAxiosService().updateQuantity(this.props.bookDetails.bookCartID, this.state.quantityValue)
    }

    render() {
        return (
            <div className="details">
                <div className="book-image">
                    <div className="image">
                        <img src={this.props.bookDetails.book.bookImage} alt="img" className="image" />
                    </div>
                </div>
                <div className="book-description">
                    <div className="book-name">{this.props.bookDetails.book.bookName}</div>
                    <div className="author-name">by {this.props.bookDetails.book.authorName}</div>
                    <div className="price">Rs. {this.props.bookDetails.book.bookPrice * this.state.quantityValue}</div>
                    <div className={this.props.quantityVisibility}>
                        <div className="increment-decrement">
                            <button className="minus-plus" onClick={this.decrement} style={ this.state.quantityValue < 2 || this.props.disableOperator ? {pointerEvents: 'none'} : {pointerEvents: 'auto'} }><RemoveCircleOutlineIcon style={ this.state.quantityValue < 2 || this.props.disableOperator ? {color: "grey"} : {color: "rgb(145, 10, 10)"}}  /></button>
                            <input type="number" className="number" value={this.state.quantityValue} />
                            <button className="minus-plus" onClick={this.increment} style={ this.state.quantityValue == this.props.bookDetails.book.quantity || this.state.quantityValue >= 5 || this.props.disableOperator ? {pointerEvents: 'none'} : {pointerEvents: 'auto'} }><AddCircleOutlineIcon style={ this.state.quantityValue == this.props.bookDetails.book.quantity || this.state.quantityValue >= 5 || this.props.disableOperator ? {color: "grey"} : {color: "rgb(145, 10, 10)"} }/></button>
                            <button className="remove" style={this.props.disableOperator ? {pointerEvents: 'none',color:"grey"} : {pointerEvents: 'auto'}} onClick={this.handleRemove}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MyCart;