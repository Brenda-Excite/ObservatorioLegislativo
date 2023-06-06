import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/argon-css/css/argon-dashboard-react.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./assets/argon-css/css/nucleo.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

