import React from 'react'
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
    showSearchPage: false,
    // bookList: null,
    // modifiedBooks: [],
    books: []
  }

  handleBookSearchCloseClick = (data) => {
    this.setState(data);
  }

  handleBookListSearchClick = (data) => {
    this.setState(data);
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
        {this.state.showSearchPage ?
          (<BookSearch ref={BookSearch => {this.BookSearch = BookSearch}}
                       syncBooks={() => {this.getAllBooks()}}
                       onClickClose={this.handleBookSearchCloseClick} />) :
          (<BookList
                     ref={BookList => { this.BookList = BookList }}
                     syncBooks={() => {this.getAllBooks()}}
                     onClickSearch={this.handleBookListSearchClick} />)
        }
      </div>
    )
  }
}

export default BooksApp
