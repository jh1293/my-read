import React from 'react'
import BookShelf from './BookShelf'
import Book from './Book'
import * as ArrayUtils from '../utils/ArrayUtils'
import * as BooksAPI from '../apis/BooksAPI'
import './BookList.css'

class BookList extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    this.setState({books: this.props.data});
  }

  componentWillReceiveProps() {
    this.setState({books: this.props.data});
  }

  handleSearchClick = () => {
    this.props.onClickSearch({showSearchPage: true});
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading">
              {this.state.books.filter(book => book.shelf === 'currentlyReading').map(book => (<Book key={book.id} data={book} updateBookInfo={() => {this.props.refresh()}} />))}
            </BookShelf>
            <BookShelf title="Want to Read">
              {this.state.books.filter(book => book.shelf === 'wantToRead').map(book => (<Book key={book.id} data={book} updateBookInfo={() => {this.props.refresh()}} />))}
            </BookShelf>
            <BookShelf title="Read">
              {this.state.books.filter(book => book.shelf === 'read').map(book => (<Book key={book.id} data={book} updateBookInfo={() => {this.props.refresh()}} />))}
            </BookShelf>
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.handleSearchClick}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookList
