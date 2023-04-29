import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { App } from './App';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { onResourceAddMiddlewares, onResourceRemoveMiddlewares } from './store/resources';
import { pixiLoader } from './middlewares/pixiLoaderMiddleware';

// I will use this middlewares to preload assets for pixi, which is used as the previewer component
onResourceAddMiddlewares.push(pixiLoader.loadAssets);
onResourceRemoveMiddlewares.push(pixiLoader.removeAssets);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
