import {post, get} from './Service'

class AdminAxiosService {

    addBookToDatabase(data) {
        return (post(data, 'admin/book'))
    }

    addImage(data) {
        return (post(data, 'admin/book/image'))
    }

    trackOrder(pageValue) {
        return (get('admin/orders/'+pageValue))
    }

}

export default AdminAxiosService