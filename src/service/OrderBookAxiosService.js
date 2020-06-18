import {deleteData, get, post, tokenPost, update} from './Service';

class OrderBookAxiosService {

    setBagBookDetails(data) {
        return (post(data, 'cart/' + data.quantity + '/' + data.bookId))
    }

    myCart() {
        return (get('cart/'))
    }

    deleteBooksFromCartDatabase(id) {
        return (deleteData('cart/' + id))
    }

    updateQuantity(bookCartId, quantity) {
        return (update('cart/' + bookCartId + '/' + quantity))
    }

    placeOrder() {
        return (tokenPost('bookstore/order/'))
    }

    getOrderedBooks() {
        return (get('bookstore/orders'))
    }
}

export default OrderBookAxiosService;