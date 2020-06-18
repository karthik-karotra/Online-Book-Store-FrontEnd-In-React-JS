import React from 'react';
import '../css/AdminHomePage.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import BookStoreFooter from "../../util/js/BottomBar";
import AdminAxiosService from '../../../service/AdminAxiosService';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AdminTrackOrder from './AdminTrackOrder';
import Pagination from "@material-ui/lab/Pagination";
import AdminAddBook from './AdminAddBook';
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";


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
            pageValue: 1,
            setVisibilityOfSignOutCard: 'hidden'
        }
    }

    handleChange = () => {
        this.setState({isOpen: true})
    }

    addBook = () => {
        this.setState({
            isOpen: false,
            updateTrackOrder: 'track-container-main-disable',
            updateBookPanel: 'order-count-disable',
            pagination: 'admin-pagination-disable',
            addBookPanel: 'block'
        })
    }

    updateOrderStatus = () => {
        this.setState({
            isOpen: false,
            addBookPanel: 'none',
            updateBookPanel: 'order-count',
            updateTrackOrder: 'track-container-main',
            pagination: 'admin-pagination'
        })
    }

    handleSignOutCard = () => {
        if (this.state.setVisibilityOfSignOutCard === 'hidden') {
            this.setState({setVisibilityOfSignOutCard: 'visible'})
        } else {
            this.setState({setVisibilityOfSignOutCard: 'hidden'})
        }
    }

    handleLogOutChange = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        this.props.history.push("/admin/login");
    }

    trackOrder = () => {
        new AdminAxiosService().trackOrder(this.state.pageValue).then((response) => {
            if (response.data.message == 'Response Successful') {
                this.setState({orderDetails: response.data.data})
            } else {
                this.setState({orderDetails: []})
            }
        })
    }

    handlePageChange = (event, value) => {
        this.setState({pageValue: value}, () => {
            this.trackOrder()
            window.scrollTo(0, 0);
        })
    }

    getCount = () => {
        new AdminAxiosService().getCount().then((response) => {
            this.setState({totalOrderCount: response.data.data, isLoaded: true})
        })
    }

    componentDidMount() {
        if (localStorage.getItem('adminToken') != null && localStorage.getItem('adminData') != null) {
            this.getCount();
            this.trackOrder();
        } else {
            this.props.history.push('/admin/login')
        }

    }

    render() {
        return (
            <div className="admin-container">

                <Card className="logout-card" style={{
                    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    visibility: this.state.setVisibilityOfSignOutCard, position: "fixed"
                }} variant="outlined">
                    <CardContent>
                        <Typography style={{fontWeight: "bold"}}>Hello, {localStorage.getItem('adminData')}</Typography>
                        <Typography style={{fontSize: "small", marginTop: "2px"}} color="textSecondary" gutterBottom
                                    className="gutterbottomfont">countrybookshop@gmail.com</Typography>
                        <hr/>
                        <Button className="signout-button" onClick={this.handleLogOutChange}>LOGOUT</Button>
                    </CardContent>
                </Card>

                <AppBar position="fixed" style={{backgroundColor: 'rgb(145,10,10)'}}>
                    <Toolbar className="menu-bar">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuBookIcon style={{fontSize: "30px"}}/>
                        </IconButton>
                        <Typography variant="h6" id="name-shop">
                            <Link to="/"> The Country Book Shop </Link>
                        </Typography>
                        <div className="menu">
                            <div><UpdateSharpIcon titleAccess="Update Order Status" onClick={this.updateOrderStatus}
                                                  style={{fontSize: "xx-large"}}/></div>
                            <div><AddIcon titleAccess="Add Book" onClick={this.addBook} style={{fontSize: "xx-large"}}/>
                            </div>
                            <div><PermIdentityIcon titleAccess="Profile" onClick={this.handleSignOutCard}
                                                   style={{fontSize: "xx-large"}}/></div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={this.state.updateBookPanel}>
                    <div className="book-status-wrapper">
                        <div className="status-count">
                            <h2>Orders<span className="counts">({this.state.totalOrderCount})</span></h2>
                        </div>
                    </div>
                </div>
                <div className="panel-container" style={{display: this.state.addBookPanel}}>
                    <div className='panel'>
                        <div className="add-book-panel">
                            <AdminAddBook/>
                        </div>
                    </div>
                </div>
                <div className={this.state.updateTrackOrder}>
                    <div className="track-container">
                        {this.state.orderDetails.map((orderDetails, index) =>
                            <AdminTrackOrder orderDetails={orderDetails}/>
                        )}
                    </div>
                </div>
                <div className={this.state.pagination}>
                    <Pagination count={Math.ceil(this.state.totalOrderCount / this.state.orderPerPage)} shape="rounded"
                                onChange={this.handlePageChange}/>
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }

}

export default withRouter(AdminHomePage)