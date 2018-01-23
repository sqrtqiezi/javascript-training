import React, { Component } from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import BookList from './container/BookList';
import SearchBox from './container/SearchBox';
import SearchResult from './container/SearchResult';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // 整个 App 的 state 都在这里定义，然后由 App 传递给子组件
    this.state = {
      reading: [],
      read: [],
      wish: [],
      search: [],
      isSearching: false
    }
  }

  componentDidMount() {
    const initState = books => this.setState({ ...books });

    let books = localStorage.getItem('books');
    if (!!books) {
      initState(JSON.parse(books));
    } else {
      books = {
        read: [],
        reading: [],
        wish: []
      }
      fetchJsonp('https://api.douban.com/v2/book/user/sqrtqiezi/collections?count=50')
        .then(response => {
          response.json().then(data => {
            data.collections.forEach(item => {
              books[item.status].push({
                ...item.book,
                status: item.status
              });
            })
            initState(books);
            setTimeout(this.saveState.bind(this), 0);
          })
        });
    }
  }

  saveState() {
    const { read, reading, wish } = this.state;
    localStorage.setItem('books', JSON.stringify({ read, reading, wish }));
  }

  onSearch(value) {
    value = value.trim();
    if (!!value) {
      this.searchBooks(value);
      const { history } = this.props;
      history.push(`/search/${value}`);
    }
  }

  searchBooks(q) {
    const findBookStatus = (book, books) => {
     for (const item of books) {
       if (item.id === book.id) {
         book.status = item.status;
       }
     }
    }
    if (!this.state.isSearching) {
      this.setState({ 
        isSearching: true,
        search: [] 
      });
      fetchJsonp(`https://api.douban.com/v2/book/search?q=${q}`)
        .then(response => {
          response.json()
            .then(data => {
              const books = data.books;
              books.forEach(book => {
                findBookStatus(book, this.state.reading);
                findBookStatus(book, this.state.read);
                findBookStatus(book, this.state.wish);
              })
              this.setState({
                isSearching: false,
                search: books
              })
            });
        });
    }
  }

  changeStatus(book, newStatus) {
    const oldStatus = book.status;

    if (oldStatus !== newStatus) {
      const oldTemp = this.state[oldStatus];
      const newTemp = this.state[newStatus];

      const index = this.state[oldStatus]
        .findIndex(item => item.id === book.id);

      book.status = newStatus;
      this.setState({
        // 从原状态数组中，删除变更状态的 book
        [oldStatus]: [...oldTemp.slice(0, index), ...oldTemp.slice(index + 1, oldTemp.length)],
        // 将变更状态的 book，加入当前状态的数组中
        [newStatus]: [book, ...newTemp]
      });

      // 待渲染结束之后，保存
      setTimeout(this.saveState.bind(this), 0);
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <div className="logo">B</div>
          <ul className="navbar">
            <li><NavLink to="/reading">在读</NavLink></li>
            <li><NavLink to="/read">读过</NavLink></li>
            <li><NavLink to="/wish">想读</NavLink></li>
          </ul>
        </nav>
        <div className="container">
          <header>
            <div className="title">Bookshelf</div>
            <SearchBox onSearch={this.onSearch.bind(this)} />
          </header>
          <Route exact path="/" render={() => (
            <Redirect to="/reading" />
          )} />
          <Route path="/reading" render={() => (
            <BookList
              books={this.state.reading}
              changeStatus={this.changeStatus.bind(this)}
            />)} 
          />
          <Route path="/read" render={(props) => (<BookList
              books={this.state.read}
              changeStatus={this.changeStatus.bind(this)}
            />)}
          />
          <Route path="/wish" render={(props) => (<BookList
              books={this.state.wish}
              changeStatus={this.changeStatus.bind(this)} 
            />)}
          />
          <Route path="/search/:q" render={(props) => (<SearchResult
              books={this.state.search}
              isSearching={this.state.isSearching}
              match={props.match}
              changeStatus={this.changeStatus.bind(this)}
              searchBooks={this.searchBooks.bind(this)}
            />)}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
