import React from "react";
import {Provider} from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes} from "./routes/Routes";
import ReactDOM from 'react-dom';
import store from "./core/services/store";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes/>
            </Router>
        </Provider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);