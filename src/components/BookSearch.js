import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../apis/BooksAPI'
import * as ArrayUtils from '../utils/ArrayUtils'
import './BookSearch.css'

class BookSearch extends React.Component {
  state = {
    localBooks: [],
    searchKeyword: '',
    searchResults: []
  }

  passState = (data) => {
    this.setState({
      localBooks: data
    })
  }

  handleKeywordChange = (e) => {
    this.setState({
      searchKeyword: e.target.value
    });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let keyword = this.state.searchKeyword;
      let localBooks = this.state.localBooks;
      let localBooksSearchResults = ArrayUtils.searchArrayByKeyword(localBooks, ['title', 'authors'], keyword);
      let remoteBooksSearchResults, finalSearchReasults;
      BooksAPI.search(keyword)
              .then(result => {
                if (result instanceof Array && result.length) {
                  remoteBooksSearchResults = result.map(result => {
                    result.shelf = 'none';
                    return result;
                  });
                } else {
                  remoteBooksSearchResults = [];
                }
                finalSearchReasults = ArrayUtils.MergeAndUniqueByPropertyName(remoteBooksSearchResults, localBooksSearchResults, 'title');
                this.setState({searchResults: finalSearchReasults});
              })
              .catch(error => {
                finalSearchReasults = localBooksSearchResults;
                this.setState({searchResults: finalSearchReasults});
              })

    }, 500)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={this.state.searchKeyword} onChange={this.handleKeywordChange} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchResults.map(book => (<Book key={book.id} ref={Book => { Book ? Book.passState(book) : void(0)}} syncBooks={() => {this.props.syncBooks()}} />))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
