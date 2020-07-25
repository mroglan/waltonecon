import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
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
    },
    paper: {
        background: '#fff',
        padding: theme.spacing(3),
        maxWidth: 1000,
        margin: '0 auto'
    },
    title: {
        display: 'inline-block',
        borderBottom: '3px solid #556cd6'
    },
    text: {
        color: 'rgba(0, 0, 0, .9)',
        fontSize: '1.2rem',
        lineHeight: theme.spacing(.2)
    },
    link: {
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        },
        cursor: 'pointer'
    },
    list: {
        listStyleType: 'none',
        marginTop: 0,
        paddingLeft: 0,
        '& li': {
            fontSize: '1.2rem',
            margin: `${theme.spacing(1)}px 0`
        }
    }
}))

export default function Contact() {

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Contact - Walton Economics Challenge</title>
            </Head>
            <div className={classes.root}>
                <main className={classes.main}>
                    <Header />
                    <Grid container justify="center">
                        <Grid item xs={12} sm={9} lg={8}>
                            <Paper className={classes.paper} elevation={0}>
                                <Box>
                                    <Typography className={classes.title} variant="h3" component="h1">
                                        Contact
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography variant="body1" className={classes.text}>
                                        Feel free to contact us if you have any questions or concerns!
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography variant="h6">
                                        Club Email
                                    </Typography>
                                    <Typography variant="body1" className={classes.text}>
                                        <a href="mailto:waltoneconchallenge@gmail.com" className={classes.link}>
                                            waltoneconchallenge@gmail.com
                                        </a>
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography variant="h6">
                                        Teacher Sponsor
                                    </Typography>
                                    <Typography variant="body1" className={classes.text}>
                                        <a href="mailto:David.Dewar@cobbk12.org" className={classes.link}>
                                            David.Dewar@cobbk12.org
                                        </a>
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography variant="h6">
                                        Officers
                                    </Typography>
                                    <ul  className={classes.list}>
                                        <li>
                                            President: Manuel Roglan
                                        </li>
                                        <li>
                                            Vice President: Aditya Palliyil 
                                        </li>
                                        <li>
                                            Coordinator: Denis
                                        </li>
                                        <li>
                                            Secretary: Frida Knudsen 
                                        </li>
                                    </ul>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
                <footer className={classes.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

