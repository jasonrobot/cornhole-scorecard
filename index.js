import React from 'react';
import ReactDOM from 'react-dom';
const e = React.createElement;

import {App} from './src/App.ts';

import store from './src/store';
import { Provider } from 'react-redux';

// mount our app, that's it
ReactDOM.render(
    e(Provider, {store}, e(App)),
    // e(App),
    document.getElementById('root')
);
