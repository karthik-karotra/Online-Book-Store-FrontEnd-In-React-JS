import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import './CardView.css';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class CardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: '18-the-power-of-positive-thinking'
        }
    }

    render() {
        return (
            <Card className="cards">
                <CardActionArea>
                    <CardMedia
                        className="media"
                        image={require(`../../images/${this.state.a}.jpg`)}
                        title="Paella dish"
                    />
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6">Don't Make Me Think</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">by Steve King</Typography>
                    <Typography gutterBottom variant="h6" component="h2">Rs. 1500</Typography>
                    <Button variant="contained" size="medium" color="secondary">
                        Add To Bag
                    </Button>
                </CardContent>
            </Card>
        )
    }

}

export default CardView;