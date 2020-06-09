import {post} from './Service'

class AdminAxiosService {

    addBookToDatabase(data) {
        return (post(data, 'admin/book'))
    }

    addImage(data) {
        return (post(data, 'admin/book/image'))
    }
}

export default AdminAxiosService