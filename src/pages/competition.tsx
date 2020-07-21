import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import TopicCards from '../components/competition/TopicCards'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    main: {
        flexGrow: 1,
        background: 'linear-gradient(to bottom, #fff 0%, #F3F3ED 20%, #F3F3ED 100%)'
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
        }
    }
}))

export default function Resources() {

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Competition - Walton Economics Challenge</title>
            </Head>
            <div className={classes.root}>
                <main className={classes.main}>
                    <Header />
                    <Grid container justify="center">
                        <Grid item xs={12} sm={9} lg={8}>
                            <Paper className={classes.paper} elevation={0}>
                                <Box>
                                    <Typography className={classes.title} variant="h3" component="h1">
                                        The Competition
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography className={classes.text} variant="body1">
                                        The National Economics Challenge is the major economics competition in the U.S. 
                                        currently. Teams from all 50 states and from across the world compete at the 
                                        state, regional, and national level. There are three major categories covered 
                                        throughout the competition:
                                    </Typography>
                                </Box>
                                <Box>
                                    <TopicCards />
                                </Box>
                                <Box pt={3} pb={1}>
                                    <Typography className={classes.text} variant="body1">
                                        The competition has two divisions: the Adam Smith division for those who have previously
                                        taken rigorous economics courses, and the David Ricardo division for those with less experience
                                        in economics.
                                    </Typography>
                                </Box>
                                <Box pb={1}>
                                    <Typography className={classes.text} variant="body1">
                                        Teams will compete in a statewide competition, and if successful will have the opportunity to
                                        competete in the national semi-finals and finals. 
                                    </Typography>
                                </Box>
                                <Box pb={1}>
                                    <Typography className={classes.text} variant="body1">
                                        The Council for Economic Education has more information
                                        on <a href="https://www.councilforeconed.org/national-economics-challenge/competition-procedure/" className={classes.link}>competition procedure</a>.
                                    </Typography>
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