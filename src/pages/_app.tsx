import { Box, Container, CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
      dark: 'hsl(241, 82%, 43%)',
      light: 'hsl(241, 82%, 90%)'
    },
    error: {
      main: red.A400,
      light: 'hsla(348, 91%, 55%, .9)'
    },
    success: {
      main: 'hsl(140, 81%, 31%)',
      light: 'hsl(140, 81%, 40%)'
    },
    background: {
      default: '#fff'
    },

  },
  spacing: 8
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Walton Economics Challenge</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="icon" type="image/png" href="/waltonLogo.png" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <style jsx global>{`
            #nprogress .bar {
              background: hsl(301, 77%, 40%);
              height: .2rem
            }
          `}</style>
            <Container maxWidth={false} style={{padding: 0}}>
                <Component {...pageProps} />
            </Container>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}