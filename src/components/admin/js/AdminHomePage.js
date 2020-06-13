import React from 'react';
import '../css/AdminHomePage.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import BookStoreFooter from "../../util/js/BottomBar";
import AdminAxiosService from '../../../service/AdminAxiosService';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AdminTrackOrder from './AdminTrackOrder';
import Pagination from "@material-ui/lab/Pagination";
import AdminAddBook from './AdminAddBook';

class AdminHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            addBookPanel: 'none',
            updateTrackOrder: 'track-container-main',
            orderDetails: [],
            updateBookPanel: 'order-count',
            pagination: 'admin-pagination',
            totalOrderCount: 0,
            orderPerPage: 12,
            pageValue: 0
        }
    }

    handleChange = () => {
        this.setState({isOpen: true})
    }

    addBook = () => {
        this.setState({isOpen: false, updateTrackOrder: 'track-container-main-disable', updateBookPanel: 'order-count-disable', pagination: 'admin-pagination-disable', addBookPanel: 'block'})
    }

    updateOrderStatus = () => {
        this.setState({isOpen: false, addBookPanel: 'none',updateBookPanel: 'order-count', updateTrackOrder: 'track-container-main', pagination: 'admin-pagination'})
    }

    trackOrder = () => {
        new AdminAxiosService().trackOrder(this.state.pageValue).then((response) => {
            console.log(response.data)
            if(response.data.message == 'Response Successful') {
                this.setState({orderDetails: response.data.data, totalOrderCount: response.data.data.length})
            } else {
                this.setState({orderDetails: []})
            }
        })
    }

    handleChange = (event, value) => {
        this.setState({pageValue: value - 1}, () => {
            this.trackOrder()
            window.scrollTo(0, 0);
        })
    }

    componentDidMount(){
        this.trackOrder();
    }

    render() {
        return(
            <div className="admin-container">
                <AppBar position="fixed" style={{backgroundColor:'rgb(145,10,10)'}}>
                    <Toolbar className="menu-bar">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuBookIcon style={{fontSize:"30px"}} />
                        </IconButton>
                        <Typography variant="h6">
                            The Country Book Shop
                        </Typography>
                        <div className="menu">
                            <div><UpdateSharpIcon titleAccess="Update Order Status" onClick={this.updateOrderStatus} style={{fontSize:"xx-large"}} /></div>
                            <div><AddIcon titleAccess="Add Book" onClick={this.addBook} style={{fontSize:"xx-large"}} /></div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={this.state.updateBookPanel}>
                    <div className="book-status-wrapper">
                        <div className="status-count">
                            <h2>({this.state.orderDetails.length}) Orders Found</h2>
                        </div>
                    </div>
                </div>
                <div className="panel-container" style={{display:this.state.addBookPanel}}>
                    <div className='panel'>
                        <div className="add-book-panel">
                            <AdminAddBook />
                        </div>
                    </div>
                </div>
                <div className={this.state.updateTrackOrder}>
                    <div className="track-container">
                        {this.state.orderDetails.map((orderDetails, index) =>
                            <AdminTrackOrder orderDetails={orderDetails} />
                        )}
                    </div>
                </div>
                <div className={this.state.pagination}>
                    <Pagination count={Math.ceil(this.state.totalOrderCount / this.state.orderPerPage)} shape="rounded" onChange={this.handlePageChange}/>
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }

}

export default AdminHomePage