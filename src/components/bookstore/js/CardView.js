import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import '../css/CardView.css';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class CardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible : false,
            disable: false
        }
    }

    componentDidMount() {
        this.disableButton();
    }

    disableButton = () => {
        if (this.props.bookDetails.quantity == 0) {
            this.setState({disable : true})
        }
    }

    handleChangeOnMouseOver = () => {
        this.setState({isVisible : true}, () => {this.props.valueSender(this.state.isVisible, this.props.bookDetails.bookDetails)})
    }

    handleChangeOnMouseOut = () => {
        this.setState({isVisible : false}, () => {this.props.valueSender(this.state.isVisible, this.props.bookDetails.bookDetails)})
    }

    render() {
        return (
            <Card className="cards">
                <CardActionArea>
                    <CardMedia
                        className="media" onMouseOver={this.handleChangeOnMouseOver} onMouseOut={this.handleChangeOnMouseOut}
                        image={require(`../../../assests/images/${this.props.bookDetails.bookImage}`)}
                        title="Paella dish"
                    />
                    <div id="centered" className={this.props.bookDetails.quantity == 0 ? 'visible' : 'hidden'}>OUT OF STOCK</div>
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6">{this.props.bookDetails.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">by {this.props.bookDetails.authorName}</Typography>
                    <Typography gutterBottom variant="h6" component="h2">Rs. {this.props.bookDetails.bookPrice}</Typography>
                    <Button variant="contained" disabled={this.state.disable}>
                        Add To Bag
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

export default CardView