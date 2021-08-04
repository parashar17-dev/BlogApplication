import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BlogState from './pages/context/BlogState';

ReactDOM.render(
   <React.StrictMode>
      <BlogState>
         <App />
      </BlogState>
   </React.StrictMode>,
   document.getElementById('root')
);
