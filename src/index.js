import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import AuthReducer from './components/Context/AuthReducer';
//import {createStore} from 'redux';

//const store=createStore(AuthReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
//const renderapp = () => root.render(
root.render(
  <React.StrictMode>
    {/* <App store={store} /> */}
    <App/>
  </React.StrictMode>
);

// renderapp();
// store.subscribe(renderapp)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
