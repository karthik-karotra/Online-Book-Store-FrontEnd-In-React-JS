import {deleteData, get, post, tokenPost, update} from './Service';
import Axios from 'axios';
import URL from '../config/UrlConstant';

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

    placeOrder(discountPrice, discountCoupon) {
        return (tokenPost('bookstore/order/' + discountPrice + '/?discountCoupon=' + discountCoupon))
    }

    getOrderedBooks() {
        return (get('bookstore/orders'))
    }

    getCoupons = (totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('token')},
            method: 'get',
            params: {totalPrice: totalPrice},
            url: `${URL.apiURL}coupons`,
        })
    }

    addDiscountPrice = (discountCoupon, totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('token')},
            method: 'post',
            params: {discountCoupon: discountCoupon, totalPrice: totalPrice},
            url: `${URL.apiURL}order/coupon`,
        })
    }
}

export default OrderBookAxiosService;