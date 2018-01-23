import React, { Component } from 'react';
import './styles.css';

const ChangeButton = ({ active, caption, changeStatus }) => (
  active ?
    <span>{caption}</span> :
    <button onClick={changeStatus}>{caption}</button>
);

class Book extends Component {
  constructor() {
    super();
    this.state = { active: false }
  }
  onMouseEnterHandler(event) {
    this.setState({ active: true });
  }

  onMouseLeaveHandler(event) {
    this.setState({ active: false });
  }

  render() {
    const { book, changeStatus, lastOfRow } = this.props;
    const { active } = this.state;

    return (<div 
      className="book-item" 
      onMouseEnter={this.onMouseEnterHandler.bind(this)}
      onMouseLeave={this.onMouseLeaveHandler.bind(this)}
    >
      <div className="item-content">
        <img src={book.image} className="cover" alt=""/>
      </div>
      <div className="item-footer">
        <h3>{book.title}</h3>
        <span>{book.author[0]}</span>
      </div>
      <div className="item-info" style={{
        display: active ? 'block' : 'none',
        left: lastOfRow ? '-273px' : '100%'
      }}>
        <div className="summary">
          <h4>summary</h4>
          <p>{book.summary}</p>
          <h4>status</h4>
          <div className="status-control">
            <ChangeButton
              caption="在读" 
              active={book.status === 'reading'} 
              changeStatus={() => changeStatus(book, 'reading')}
            />
            <ChangeButton
              caption="读过"
              active={book.status === 'read'}
              changeStatus={() => changeStatus(book, 'read')}
            />
            <ChangeButton
              caption="想读"
              active={book.status === 'wish'}
              changeStatus={() => changeStatus(book, 'wish')}
            />
          </div>
        </div>
      </div>
    </div>);
  }
}

const BookList = ({ history, books, changeStatus }) => {
  let count = 0;
  return (<main>
    {
      books.map(book => (
        <Book book={book} changeStatus={changeStatus} key={book.id} lastOfRow={++count % 5 === 0} />
      ))
    }
  </main>);
};

export default BookList;
