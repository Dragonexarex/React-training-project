import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import Title from 'components/Title';

import 'css/app.less';

const title = 'React Internship';

ReactDOM.render(
  <App className="app">
    <Title title={title} className="title" />
  </App>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
