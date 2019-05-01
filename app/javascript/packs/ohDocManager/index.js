import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.getElementById('ohdoc-challenge-manager'),
  )
});