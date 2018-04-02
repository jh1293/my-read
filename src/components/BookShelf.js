import React from 'react'
import './BookShelf.css'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.children}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
