import React from 'react'
import * as BooksAPI from '../apis/BooksAPI'
import './Book.css'

class Book extends React.Component {
  state = {}

  passState = (data) => {
    this.setState(data);
  }

  handleSelectionChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({shelf: e.target.value}, () => {
      BooksAPI.update(this.state, e.target.value)
              .then(result => {
                this.props.syncBooks();
              })
    });
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.state.imageLinks && this.state.imageLinks.thumbnail || ''})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf || 'none'} onChange={this.handleSelectionChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.state.title || ''}</div>
          <div className="book-authors">{this.state.authors && this.state.authors.join(', ') || ''}</div>
        </div>
      </li>
    )
  }
}

export default Book
