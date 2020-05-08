import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import './CardView.css';

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
            </Card>
        )
    }

}

export default CardView;