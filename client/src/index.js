import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as monaco from 'monaco-editor';

// monaco.editor.create(document.getElementById('id'), {
//   value: [
//     'function x() {',
//     '\tconsole.log("Hello world!");',
//     '}'
//   ].join('\n'),
//   language: 'javascript'
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
