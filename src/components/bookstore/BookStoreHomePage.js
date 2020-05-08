import React, {Component} from 'react'
import NavigationBar from "./NavigationBar";
import BookStoreFooter from "./BookStoreFooter";
import './BookStoreHomePage.css'

export class BookStoreHomePage extends Component {
    render() {
        return (
            <div className="container1">
                <NavigationBar/>
                <div className="flex-container">

                </div>
                <div className="userfooter">
                    <BookStoreFooter/>
                </div>

            </div>
        )
    }
}

export default BookStoreHomePage
