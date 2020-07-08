import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import "../css/Coupon.css"
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

class Coupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibilityOfDialogBox: true,
        }
    }

    handleCancel = () => {
        this.props.handleDialogVisibility();
    }

    render() {
        return (
            <div className="coupon-hero">
                <div>
                    <Card className="coupon-box2">

                        <div className="coupon-name-div1">
                            <Typography style={{color:"#fff", fontSize:"22px", marginLeft:"5%"}} >
                                Coupons
                            </Typography>
                        </div>
                        <div className="coupon-noscroll">
                                    <div>
                                        <div style={{display:"flex",marginTop:"2%"}}>
                                            <FormControlLabel
                                                value="CB100"
                                                name="CB100"
                                                control={<Checkbox style={{marginLeft:"21%",color: "#a52a2a"}}/>}
                                            />

                                            <div style={{display:"flex",marginTop:"1%",width:"92%"}}>
                                                <Typography><span  className="coupon-text">CB100</span></Typography>
                                                <Typography style={{marginLeft:"4%"}}>10% Off upto Rs.100 on minimum purchase of Rs.699.0</Typography>
                                            </div>

                                        </div>
                                        <Typography id="coupon-name-Rs"><b>Save Rs.100</b></Typography>
                                        <Typography id="coupon-name-expire">Expires on <b>30 July 2020</b></Typography>
                                        <Divider style={{width:"95%",marginLeft:"2%",marginTop:'2%'}}/>
                                    </div>
                        </div>
                        <Typography style={{marginTop: "5%", marginLeft: "2%"}}>
                            <Button id="coupon-btn" onClick={this.handleCancel}>CANCEL</Button>
                            <Button id="coupon-btn">APPLY</Button>
                        </Typography>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Coupon;