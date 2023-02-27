import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './context/FetchProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FetchProvider>
      <App />
    </FetchProvider>,
  );
