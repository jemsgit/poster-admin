import React from 'react';
import ReactDOM from 'react-dom';
// import "./index.css";
import App from './components/app/app';
import { StoreProvider } from './hooks/useStore';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
