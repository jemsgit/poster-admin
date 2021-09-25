import React from 'react';
import ReactDOM from 'react-dom';
// import "./index.css";
import App from './ui/components/app/app';
import { StoreProvider } from './ui/hooks/useStore';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
