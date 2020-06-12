import React from 'react';
import '../css/AdminHomePage.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import UpdateSharpIcon from '@material-ui/icons/UpdateSharp';
import BookStoreFooter from "../../util/js/BottomBar";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AdminTrackOrder from './AdminTrackOrder';
import Pagination from "@material-ui/lab/Pagination";
import AdminAddBook from './AdminAddBook';

class AdminHomePage extends React.Component {

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
                            <div><UpdateSharpIcon titleAccess="Update Order Status" /></div>
                            <div><AddIcon titleAccess="Add Book" /></div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="order-count">
                    <div className="book-status-wrapper">
                        <div className="status-count">
                            <h2>Orders Found</h2>
                        </div>
                    </div>
                </div>
                <div className="panel-container">
                    <div className='panel'>
                        <div className="add-book-panel">
                            <AdminAddBook />
                        </div>
                    </div>
                </div>
                <div className="track-container-main">
                    <div className="track-container">
                        <AdminTrackOrder/>
                    </div>
                </div>
                <div className="admin-pagination">
                    <Pagination count={0} shape="rounded"/>
                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>
            </div>
        )
    }

}

export default AdminHomePage