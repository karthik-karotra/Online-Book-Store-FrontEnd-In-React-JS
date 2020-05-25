import {post} from './Service'

class AdminAxiosService {

    addBookToDatabase(data) {
        return (post(data, 'admin/book'))
    }
}

export default AdminAxiosService