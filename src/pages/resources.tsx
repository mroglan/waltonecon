import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Card, CardContent, CardActions} from '@material-ui/core'
import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ResourceCard from '../components/resources/ResourceCard'
import Filters from '../components/resources/Filters'
import {IResource} from '../database/modelInterfaces'
import database from '../database/database'
import {useReducer, useMemo} from 'react'

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

export interface IFilterState {
    topic: string;
    resourceType: string;
    search: string;
}

interface IFilterAction {
    type: string;
    payload: string;
}

function filterReducer(state:IFilterState, action:IFilterAction) {
    switch(action.type) {
        case 'changeTopic': 
            return {...state, topic: action.payload}
        case 'changeResourceType': 
            return {...state, resourceType: action.payload}
        case 'changeSearch':
            return {...state, search: action.payload}
        default:
            return state
    }
}

function correctTopic(topic:string, filter:string) {
    if(filter === 'any') return true
    if(filter === 'micro' && topic === 'Microeconomics') return true
    if(filter === 'macro' && topic === 'Macroeconomics') return true
    if(filter === 'fundamentals' && topic === 'Fundamentals') return true

    return false
}

function correctResourceType(type:string, filter:string) {
    if(filter === 'any') return true
    if(filter === 'presentations' && type === 'Presentation') return true
    if(filter === 'pTests' && type === 'Practice Test') return true

    return false
}

function matchesSearch(title:string, filter:string) {
    if(!filter) return true
    const regex = new RegExp(filter, 'i')
    if(title.match(regex)) return true

    return false
}

export default function Resources({resources}) {

    const [filters, filterDispatch] = useReducer(filterReducer, {
        topic: 'any',
        resourceType: 'any',
        search: ''
    })

    const filteredResources = useMemo(() => (
        resources.filter(resource => {
            return correctTopic(resource.econType, filters.topic) && correctResourceType(resource.resourceType, filters.resourceType) &&
            matchesSearch(resource.title, filters.search)
        })
    ), [filters])

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
                                <Box pb={3}>
                                    <Filters filters={filters} dispatch={filterDispatch} />
                                </Box>
                                <Grid container spacing={3} alignItems="stretch">
                                    {filteredResources.map((resource, index) => (
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