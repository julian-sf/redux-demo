// This file needs to stay here because of next.js dir structure.
// Documentation: https://nextjs.org/docs#custom-app

import NextApp from 'next/app';
import React from 'react';

import { EventsProvider } from '../comparison/context/EventsContext';
import { RouterContextProvider } from '../next-utils/router';
import { wrapper } from '../store/wrapper';

class App extends NextApp {
  private _renderPage() {
    const { Component: Page, pageProps } = this.props;

    return <Page {...pageProps} />;
  }

  render() {
    return (
      <RouterContextProvider>
        <EventsProvider>{this._renderPage()}</EventsProvider>
      </RouterContextProvider>
    );
  }
}

export default wrapper.withRedux(App);
