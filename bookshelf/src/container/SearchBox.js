import React, { Component } from 'react';
import './styles.css';

class SearchBox extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  onKeyPressHandler(event) {
    if (event.key === 'Enter') {
      const { onSearch } = this.props;
      onSearch(this.state.value);
    }
  }

  onChangeHandler(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    return (<div className="search-box">
      <input type="text" name="search" placeholder="search all books"
        onKeyPress={this.onKeyPressHandler.bind(this)}
        onChange={this.onChangeHandler.bind(this)}
      />
      <i className="fa fa-search" aria-hidden="true"></i>
    </div>);
  }
}

export default SearchBox;
