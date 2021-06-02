import React from "react";
import Main from './Main.js';
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./src/reducers";
export default function App() {
    const store = createStore(reducers, compose(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    )
}