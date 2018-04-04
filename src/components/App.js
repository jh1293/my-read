import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import BookList from './BookList'
import * as BooksAPI from '../apis/BooksAPI'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  getAllBooks = () => {
    BooksAPI.getAll()
            .then(result => {
              this.setState({books: result});
            });
  }

  componentWillMount() {
    this.getAllBooks();
  }

  componentDidUpdate() {
    if (this.BookList) {
      this.BookList.passState(this.state.books);
    }
    if (this.BookSearch) {
      this.BookSearch.passState(this.state.books);
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact
               path="/"
               render={() => (
                 <BookList  ref={BookList => { this.BookList = BookList }}
                            syncBooks={() => {this.getAllBooks()}}/>
               )} />
       <Route exact
              path="/search"
              render={() => (
                <BookSearch ref={BookSearch => {this.BookSearch = BookSearch}}
                            syncBooks={() => {this.getAllBooks()}}/>
              )} />
      </div>
    )
  }
}

export default BooksApp
