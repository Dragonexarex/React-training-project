import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const destination = document.querySelector('#app');

ReactDOM.render(<App />, destination);

module.hot.accept();
