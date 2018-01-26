import React, { Component } from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import BookList from './container/BookList';
import SearchBox from './container/SearchBox';
import SearchResult from './container/SearchResult';
import ErrorMessage from './container/ErrorMessage';
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
      isSearching: false,
      errorMessage: ''
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
        })
        .catch(error => {
          this.showError('网络加载异常');
        });
    }
  }

  showError(message) {
    console.log(message);
    this.setState({ errorMessage: message });
    setTimeout(() => {
      this.setState({ errorMessage: '' });
    }, 1000);
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
    const findBookStatus = book => {
      for (const item of this.state.read) {
        if (item.id === book.id) {
          return item.status;
        }
      }
      for (const item of this.state.reading) {
        if (item.id === book.id) {
          return item.status;
        }
      }
      for (const item of this.state.wish) {
        if (item.id === book.id) {
          return item.status;
        }
      }
      return 'search';
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
              const books = data.books.map(book => ({
                ...book,
                status: findBookStatus(book)
              }))
              this.setState({
                isSearching: false,
                search: books
              })
            });
        })
        .catch(error => {
          this.showError('网络加载异常');
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
        <ErrorMessage message={this.state.errorMessage} />
      </div>
    );
  }
}

export default withRouter(App);
