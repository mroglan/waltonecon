import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper} from '@material-ui/core'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        flexGrow: 1,
        background: '#F3F3ED'
    },
    footer: {
        background: '#F3F3ED'
    }
}))

export default function Resources() {

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Resources - Walton Economics Challenge</title>
            </Head>
            <div className={classes.root}>
                <main className={classes.main}>
                    <Header />
                </main>
                <footer className={classes.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}