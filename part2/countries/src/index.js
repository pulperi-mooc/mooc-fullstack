import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App api_key={process.env.REACT_APP_API_KEY}/>
  </React.StrictMode>,
  document.getElementById('root')
);

