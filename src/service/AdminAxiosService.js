import {adminGet, adminPost, adminUpdate} from './Service'

class AdminAxiosService {

    addBookToDatabase(data) {
        return (adminPost(data, 'admin/book'))
    }

    addImage(data) {
        return (adminPost(data, 'admin/book/image'))
    }

    trackOrder(pageValue) {
        return (adminGet('admin/orders/' + pageValue))
    }

    updateOrderStatus(orderId, orderStatus) {
        return (adminUpdate('admin/order/status/' + orderId + '/' + orderStatus))
    }

    adminLogin(data) {
        return (adminPost(data, 'admin/login'))
    }

    getCount() {
        return (adminGet('admin/orders/count'))
    }
}

export default AdminAxiosService