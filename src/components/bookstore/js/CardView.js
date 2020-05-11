import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import '../css/CardView.css';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class CardView extends React.Component {
    render() {
        return (
            <Card className="cards">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={require(`../../../assests/images/${this.props.bookDetails.bookImage}`)}
                        title="Paella dish"
                    />
                </CardActionArea>
                <div id="centered" className={this.props.bookDetails.quantity == 0 ? 'visible' : 'hidden'}>OUT OF STOCK</div>
                <CardContent>
                    <Typography gutterBottom variant="h6">{this.props.bookDetails.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">by {this.props.bookDetails.authorName}</Typography>
                    <Typography gutterBottom variant="h6" component="h2">Rs. {this.props.bookDetails.bookPrice}</Typography>
                    <Button variant="contained" size="medium" color="secondary">
                        Add To Bag
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default CardView