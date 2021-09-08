import React from 'react';
import ReactDOM from 'react-dom';

import { AppContextWrapper } from './AppContext.js';
import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </React.StrictMode>,
  document.body
);

