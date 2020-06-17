import React from 'react';
import '../css/OrderSuccessfullPage.css';
import NavigationBar from "../../util/js/NavigationBar";
import BookStoreFooter from "../../util/js/BottomBar";
import {CardMedia} from '@material-ui/core';
import successfull from '../../../assests/images/successfull.jpg';
import Button from "@material-ui/core/Button";
import ReactTooltip from "react-tooltip";
import {withRouter} from 'react-router';


class OrderSuccessfullPage extends React.Component {

    handle = () => {
        this.props.history.push('/');
    }

    render() {
        const email = "admin@bookstore.com";
        const mobileNumber = "+91 9087654321";
        const address = "42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034";
        return (
            <div className="success-container">
                <NavigationBar/>
                <div className="success">
                    <div className="success-cards">
                        <CardMedia className="success-media" image={successfull}/>
                        <div>hurray!!! your order is confirmed</div>
                        <div>your order id #653183 save the order id for</div>
                        <div>further communication..</div>
                    </div>
                    <div className="user-details">
                        <table>
                            <tr>
                                <th>Email Us</th>
                                <th>Contact Us</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <td>{email}</td>
                                <td>{mobileNumber}</td>
                                <td id="address" data-tip data-for='address-hover'>{address}
                                    <ReactTooltip id='address-hover' place="top" type="dark" effect="solid"
                                                  backgroundColor="black">
                                        <p>{address}</p>
                                    </ReactTooltip>
                                </td>
                            </tr>
                        </table>
                        <Button variant="contained" className="success-button" onClick={this.handle}>Continue
                            Shopping</Button>
                    </div>
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }

}

export default withRouter(OrderSuccessfullPage);