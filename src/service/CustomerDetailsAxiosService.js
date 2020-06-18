import {get, post} from './Service'

class CustomerDetailsAxiosService {

    setCustomerDetails(data) {
        return (post(data, 'customer'))
    }

    getCustomerDetails() {
        return (get('customer'))
    }
}

export default CustomerDetailsAxiosService;