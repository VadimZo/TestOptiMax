import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';


import store from './redux/store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>,
  document.getElementById('root') || document.createElement('div') //for test only 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();