import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './_redux/CofigureStore';
import WebSocketProvider from './_redux/actions/ActionSocket';

//Component
import App from './App';

// styles
import './index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.render(
  <Provider store={ConfigureStore()}>
    <WebSocketProvider>
        <App />
    </WebSocketProvider>
  </Provider>,

  document.getElementById('root'),
);
