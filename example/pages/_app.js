import React from "react";
import { compose } from "redux";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { withObservable } from 'next-redux-observable'
import { createAppStore, rootEpic } from '../store'


class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps }
    }

    render() {
        const {Component, pageProps, store} = this.props

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default compose(
    withRedux(createAppStore),
    withObservable(rootEpic),
)(MyApp)