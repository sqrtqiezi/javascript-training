import React from 'react';

export default ({ message }) => (<div className="error-message" 
style={{
  display: !!message ? 'block' : 'none'
}}>
  <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{message}
</div>);
