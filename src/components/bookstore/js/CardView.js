import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import '../css/CardView.css';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router';

class CardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardButton :'card-button-before-click',
            buttonText:'Add To Bag'
        }
    }

    handleChange = () => {
        if ( this.setBagItemsState() == 'Go To Cart') {
            this.props.history.push("/cart")
        }
        if ( this.setBagItemsState() != 'Go To Cart') {
            this.props.saveBagDetails(this.props.bookDetails.id)
        }
        
    }
    

    setBagItemsState=()=>{
        for(var i = 0; i < this.props.cartDetails.length; i++){
            if(this.props.bookDetails.id === this.props.cartDetails[i].book.id){
                return 'Go To Cart'
            }
        }
        return 'Add To Bag'
    }

    render() {
        return (
            <Card className="cards">
                <CardActionArea>
                    <div className="info"></div>
                    <div className="data-tooltip"><h2>Book Details</h2><p className="description-text">{this.props.bookDetails.bookDetails}</p></div>
                    <CardMedia
                        className="media"
                        image={this.props.bookDetails.bookImage}/>
                    <div id="centered" className={this.props.bookDetails.quantity === 0 ? 'visible' : 'hidden'}>OUT OF STOCK</div>
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6">{this.props.bookDetails.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">by {this.props.bookDetails.authorName}</Typography>
                    <Typography gutterBottom variant="h6" component="h2">Rs. {this.props.bookDetails.bookPrice}</Typography>
                    <Button variant="contained" className={this.setBagItemsState() === 'Add To Bag' ? 'card-button-before-click':'card-button-after-click'} onClick={this.handleChange}
                            style={this.props.bookDetails.quantity === 0 ? {backgroundColor:"#cccccc",pointerEvents:"none",color:"black"} : {backgroundColor:"rgb(145,10,10)"}}>
                            {this.setBagItemsState()}
                            </Button>
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(CardView)