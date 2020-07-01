import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configResponsive } from 'ahooks';

import { lg, md, sm } from './static/breakpoints';

import App from './App';
import Store from './store';

configResponsive({
    small: sm,
    middle: md,
    large: lg,
});

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
