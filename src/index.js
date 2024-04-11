import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root'; // Import Root component from Root.js
import reportWebVitals from './reportWebVitals';

const renderApp = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

renderApp(); // Call the renderApp function to render the Root component

// reportWebVitals();
