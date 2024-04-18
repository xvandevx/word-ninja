import '../styles/globals.css';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }: any) {
    return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

import '../styles/font/golostext.css'
import {wrapper} from "~/redux";