import React from 'react';
import '../css/AdminTrackOrder.css';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EmailIcon from '@material-ui/icons/Email';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import StepConnector from '@material-ui/core/StepConnector';
import AdminAxiosService from '../../../service/AdminAxiosService';

class AdminTrackOrder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            steps: ['Ordered', 'Packed', 'Shipped', 'Delivered'],
            activeStep: 0,
            orderId: 'order-id-details',
            orderColor: 'rgb(145,10,10)',
            colorOrder: 'white',
            updatePanel: 'status-track-disable',
            updateColor: '#F5F5F5',
            colorUpdate: 'black',
            isPacked: false,
            isShipped: false,
            isDelivered: false,
            packedDisabled: false,
            shippedDisabled: false,
            deliveredDisabled: false,
            details:[],
            totalPrice: 0
        }
    }

    order = () => {
        this.setState({orderColor: 'rgb(145,10,10)', colorOrder: 'white', colorUpdate: 'black',updateColor: '#F5F5F5', orderId: 'order-id-details', updatePanel: 'status-track-disable'})
    }

    updateStatusPanel = () => {
        this.setState({orderColor: '#F5F5F5', colorOrder: 'black', colorUpdate: 'white',updateColor: 'rgb(145,10,10)',orderId: 'order-id-details-disable', updatePanel: 'status-track'})
    }

    getOrderStatus = () => {
        if(this.props.orderDetails.orderStatus == "ORDERED") {
            this.setState({packedDisabled:false, shippedDisabled:true, deliveredDisabled:true })
        }
        if(this.props.orderDetails.orderStatus == "PACKED"){
            this.setState({isPacked:true, packedDisabled:false, shippedDisabled:false, deliveredDisabled: true})
        }
        if(this.props.orderDetails.orderStatus == "SHIPPED"){
            this.setState({isPacked:true, isShipped:true,packedDisabled:true, deliveredDisabled:false})
        }
        if(this.props.orderDetails.orderStatus == "DELIVERED"){
            this.setState({isPacked:true, isShipped:true, isDelivered:true, packedDisabled: true,shippedDisabled:true})
        }
    }

    handleChange = ({target}) => {
        if ([target.name] == "isPacked") {
            if(this.state.isPacked == true) {
                this.setState({isPacked: false, shippedDisabled: true, activeStep: this.state.activeStep-1});
                this.setOrderStatus("ORDERED");
            }
            if(this.state.isPacked == false){
                this.setState({isPacked: true, shippedDisabled: false, activeStep: this.state.activeStep+1});
                this.setOrderStatus([target.value]);
            }
        }
        if ([target.name] == "isShipped") {
            if(this.state.isShipped == true) {
                this.setState({isShipped: false,packedDisabled: false ,deliveredDisabled: true,activeStep: this.state.activeStep-1});
                this.setOrderStatus("PACKED");
            }
            if(this.state.isShipped == false){
                this.setState({isShipped: true,packedDisabled: true ,deliveredDisabled: false,activeStep: this.state.activeStep+1});
                this.setOrderStatus([target.value]);
            }
        }
        if ([target.name] == "isDelivered") {
            if(this.state.isDelivered == true) {
                this.setState({isDelivered: false, shippedDisabled: false, activeStep: this.state.activeStep-1});
                this.setOrderStatus("SHIPPED");
            }
            if(this.state.isDelivered == false){
                this.setState({isDelivered: true, shippedDisabled: true, activeStep: this.state.activeStep+1});
                this.setOrderStatus([target.value]);
            }
        }
    }

    setOrderStatus = (orderStatus) => {
        new AdminAxiosService().updateOrderStatus(this.props.orderDetails.id, orderStatus).then((response) => {
            console.log(response)
        })
    }

    updateOrderStatus = () => {
        for(var i=0; i<this.state.steps.length; i++){
            if(this.state.steps[i].toUpperCase() == this.props.orderDetails.orderStatus){
                this.setState({activeStep: i})
                break;
            }
        }
    }

    getTotalPrice = () => {
        for(var i=0; i<this.props.orderDetails.orderProduct.length; i++){
            this.setState({totalPrice: this.state.totalPrice+this.props.orderDetails.orderProduct[i].book.bookPrice*this.props.orderDetails.orderProduct[i].quantity})
        }
    }

    componentDidMount() {
        this.getTotalPrice();
        this.updateOrderStatus();
        this.getOrderStatus();
    }

    render() {

        const ColorlibConnector = withStyles({
            alternativeLabel: {
                top: 22,
            },
            active: {
                '& $line': {
                    backgroundImage:
                        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
                },
            },
            completed: {
                '& $line': {
                    backgroundImage:
                        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
                },
            },
            line: {
                height: 3,
                border: 0,
                backgroundColor: '#eaeaf0',
                borderRadius: 1,
            },
        })(StepConnector);

        const useColorlibStepIconStyles = makeStyles({
            root: {
                backgroundColor: '#ccc',
                zIndex: 1,
                color: '#fff',
                width: 50,
                height: 50,
                display: 'flex',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            active: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
            completed: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        });

        function ColorlibStepIcon(props) {
            const classes = useColorlibStepIconStyles();
            const { active, completed } = props;

            const icons = {
                1: <LocalGroceryStoreIcon />,
                2: <EmailIcon />,
                3: <LocalShippingIcon />,
                4: <PersonPinCircleIcon />,
            };

            return (
                <div
                    className={clsx(classes.root, {
                        [classes.active]: active,
                        [classes.completed]: completed,
                    })}
                >
                    {icons[String(props.icon)]}
                </div>
            );
        }

        ColorlibStepIcon.propTypes = {
            /**
             * Whether this step is active.
             */
            active: PropTypes.bool,
            /**
             * Mark the step as completed. Is passed to child components.
             */
            completed: PropTypes.bool,
            /**
             * The label displayed in the step icon.
             */
            icon: PropTypes.node,
        };

        return(
            <div className="track-order-wrapper">
                <div className="track-order-header">
                    <div className="id" style={{cursor: 'default',backgroundColor:this.state.orderColor,color:this.state.colorOrder}} onClick={this.order}>Order Id. : {this.props.orderDetails.id}</div>
                    <div className="update-button" style={{cursor: 'default',backgroundColor:this.state.updateColor,color:this.state.colorUpdate}} onClick={this.updateStatusPanel}>Update Order Status</div>
                </div>
                <div className={this.state.orderId}>
                    <div className="details-of-order">
                        <div className="sumarry">Order Summary :</div>
                        <div className="date">Order Placed : {this.props.orderDetails.orderDate}</div>
                        <div className="subitem">SubItem : {this.props.orderDetails.orderProduct.length}</div>
                        <div className="prices">Total : Rs. {this.state.totalPrice}</div>
                    </div>
                </div>
                <div className={this.state.updatePanel}>
                    <div className="level-of-status">
                        <div className="update-header">Update order Status : </div>
                        <div className="checkbox-containers">
                            <div className="checkbox-wrapper">
                                <div className="checkbox-status">Ordered</div>
                                <div className="checkbox-level"><input type="checkbox" id="ordered" name="ordered" value="ORDERED" checked disabled /></div>
                            </div>
                            <div className="checkbox-wrapper">
                                <div className="checkbox-status">Packed</div>
                                <div className="checkbox-level"><input type="checkbox" id="packed" name="isPacked" value="PACKED" checked={this.state.isPacked} onClick={this.handleChange} disabled={this.state.packedDisabled} /></div>
                            </div>
                        </div>
                        <div className="checkbox-containers">
                            <div className="checkbox-wrapper">
                                <div className="checkbox-status">Shipped</div>
                                <div className="checkbox-level"><input type="checkbox" id="shipped" name="isShipped" value="SHIPPED" checked={this.state.isShipped} onClick={this.handleChange} disabled={this.state.shippedDisabled} /></div>
                            </div>
                            <div className="checkbox-wrapper">
                                <div className="checkbox-status">Delivered</div>
                                <div className="checkbox-level"><input type="checkbox" id="delivered" name="isDelivered" value="DELIVERED" checked={this.state.isDelivered} onClick={this.handleChange} disabled={this.state.deliveredDisabled} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stepper">
                    <Stepper activeStep={this.state.activeStep} connector={<ColorlibConnector />} alternativeLabel>
                        {this.state.steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </div>
        )
    }

}

export default AdminTrackOrder