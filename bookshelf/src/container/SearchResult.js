import React, { Component } from 'react';
import BookList from './BookList';
import Loading from './Loading';

class SearchResult extends Component {
  componentDidMount() {
    const { books, match, searchBooks } = this.props;

    if (!!match.params.q && books.length === 0) {
      searchBooks(match.params.q);
    }
  }

  render() {
    const { books, changeStatus, match, isSearching } = this.props;
    return (<div>
      <div className="search-status">
        Search: <span className="token">{match.params.q}</span>
      </div>
      {
        isSearching 
        ? <Loading />
        : <BookList books={books} changeStatus={changeStatus} />
      }
    </div>);
  }
}

export default SearchResult;