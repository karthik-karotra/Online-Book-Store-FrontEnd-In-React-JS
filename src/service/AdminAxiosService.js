import {post, get, update} from './Service'

class AdminAxiosService {

    addBookToDatabase(data) {
        return (post(data, 'admin/book'))
    }

    addImage(data) {
        return (post(data, 'admin/book/image'))
    }

    trackOrder(pageValue) {
        return (get('admin/orders/' + pageValue))
    }

    updateOrderStatus(orderId, orderStatus) {
        return (update('admin/order/status/' + orderId + '/' + orderStatus))
    }
}

export default AdminAxiosService