import React from 'react';
import ReactDOM from 'react-dom';
const e = React.createElement;

import {App} from './src/App.ts';

// mount our app, that's it
ReactDOM.render(
    e(App),
    document.getElementById('root')
);
