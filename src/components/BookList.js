import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import Book from './Book'
import './BookList.css'

class BookList extends React.Component {
  state = {
    books: []
  }

  passState = (data) => {
    this.setState({books: data});
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
              {this.state.books.filter(book => book.shelf === 'currentlyReading').map(book => (<Book key={book.id} ref={Book => { Book ? Book.passState(book) : void(0)}} syncBooks={() => {this.props.syncBooks()}} />))}
            </BookShelf>
            <BookShelf title="Want to Read">
              {this.state.books.filter(book => book.shelf === 'wantToRead').map(book => (<Book key={book.id} ref={Book => { Book ? Book.passState(book) : void(0)}} syncBooks={() => {this.props.syncBooks()}} />))}
            </BookShelf>
            <BookShelf title="Read">
              {this.state.books.filter(book => book.shelf === 'read').map(book => (<Book key={book.id}  ref={Book => { Book ? Book.passState(book) : void(0)}} syncBooks={() => {this.props.syncBooks()}} />))}
            </BookShelf>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
