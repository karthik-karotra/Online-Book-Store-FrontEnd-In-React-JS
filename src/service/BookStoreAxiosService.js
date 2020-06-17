import {get} from './Service'

class BookStoreAxiosService {

    getBooksFromDatabase(pageNo) {
        return (get('books/' + pageNo))
    }

    getCount() {
        return (get('books/count'))
    }

    getSearchAndFilterBooks(pageNo, searchText, filterAttributes) {
        return (get('sort/' + pageNo + '/' + searchText + '/' + filterAttributes))
    }

}

export default BookStoreAxiosService;