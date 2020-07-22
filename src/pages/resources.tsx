import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Card, CardContent, CardActions} from '@material-ui/core'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ResourceCard from '../components/resources/ResourceCard'
import {IResource} from '../database/modelInterfaces'
import database from '../database/database'

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
}))

export default function Resources({resources}) {

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Resources - Walton Economics Challenge</title>
            </Head>
            <div className={classes.root}>
                <main className={classes.main}>
                    <Header />
                    <Grid container justify="center">
                        <Grid item xs={12} sm={9} lg={8}>
                            <Paper className={classes.paper} elevation={0}>
                                <Box>
                                    <Typography className={classes.title} variant="h3" component="h1">
                                        Resources
                                    </Typography>
                                </Box>
                                <Box py={3}>
                                    <Typography variant="body1" className={classes.text}>
                                        The following are some resources you can use to practice for the Economics Challenge. 
                                        More information on resources to prepare for the competition can be
                                        found <a href="https://www.councilforeconed.org/national-economics-challenge/what-should-i-use-to-prepare/" className={classes.link}>here</a>.
                                    </Typography>
                                </Box>
                                <Grid container spacing={3} alignItems="stretch">
                                    {resources.map((resource, index) => (
                                        <Grid item key={index} xs={12} md={6} xl={4}>
                                            <ResourceCard resource={resource} />
                                        </Grid>
                                    ))}
                                </Grid>
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

export async function getStaticProps() {
    const db = await database()
    
    const resources:IResource[] = await db.collection('resources').find({}).toArray()

    console.log('resources', resources)

    return {props: {resources: JSON.parse(JSON.stringify(resources))}, unstable_revalidate: 1}
}