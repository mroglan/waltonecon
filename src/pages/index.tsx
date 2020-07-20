import Head from 'next/head'
import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
import About from '../components/About'
import EmailSignUp from '../components/EmailSignUp'
import Header from '../components/Header'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    background: '#F3F3ED', //'#F4F4E9',
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  footer: {
    background: '#F3F3ED'
  },
  titleScreen: {
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    textShadow: '-3px 5px 9px #000'
  },
  titleBackgroundImage: {
    position: 'absolute',
    zIndex: -1,
    left: -9999,
    right: -9999,
    bottom: -9999,
    top: -9999,
    margin: 'auto',
    minWidth: '100%',
    opacity: .6
  },
  waltonLogo: {
    '& img': {
      maxWidth: 170,
      maxHeight: 170,
    },
  }
}))

export default function Home() {

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <Header />
        <Box className={classes.titleScreen}>
          <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h1" component="h1" className={classes.title}>
              Walton Economics Challenge
            </Typography>
            <Box className={classes.waltonLogo}>
              <img src="/waltonLogo.png" alt="Walton High School Logo" />
            </Box>
          </Box>
          <img className={classes.titleBackgroundImage} src="/federalReserve.png" alt="Federal Reserve" />
        </Box>
        <Box className={classes.mainContent}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <About />
            </Grid>
            <Grid item xs={12} md={4}>
              <EmailSignUp />
            </Grid>
          </Grid>
        </Box>
      </main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  )
}