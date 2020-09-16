import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "mobx-react";
import playerStore from './app/stores/playerStore';
import scoreStore from './app/stores/scoreStore';

ReactDOM.render(
    <Provider playerStore={playerStore} scoreStore={scoreStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);