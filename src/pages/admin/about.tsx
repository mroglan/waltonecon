import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, TextareaAutosize} from '@material-ui/core'
import database from '../../database/database'
import { IAbout } from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/Footer'
import ContentTextarea from '../../components/admin/ContentTextarea'
import {useState, useEffect} from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        gridTemplate: 'auto 1fr auto / minmax(200px, 25%) 1fr'
    },
    main: {
        gridColumn: '2 / 3',
        background: '#F3F3ED'
    },
    footer: {
        gridColumn: '1 / 3',
        background: '#F3F3ED'
    },
    sideBar: {
        gridColumn: '1 / 2',
        background: '#F3F3ED',
    },
    header: {
        gridColumn: '1 / 3'
    },
    paper: {
        background: '#fff',
        padding: theme.spacing(3),
        maxWidth: 1000,
        margin: '0 auto'
    },
    textarea: {
        width: '100%',
        fontSize: '1.2rem',
        lineHeight: theme.spacing(.2),
        fontFamily: 'inherit'
    }
}))

export default function About({dbContent}) {

    const [content, setContent] = useState(dbContent) // change to what is in the db


    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Admin About - Walton Economics Challenge</title>    
            </Head>
            <div className={classes.root}>
                <header className={classes.header}>
                    <AdminHeader />
                </header>
                <aside className={classes.sideBar}>
                    <SideBar />
                </aside>
                <main className={classes.main}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={9} lg={8}>
                            <Box mx={3}>
                                <Paper className={classes.paper} elevation={0}>
                                    <Box>
                                        <Typography variant="h5">
                                            Customize the About section content
                                        </Typography>
                                    </Box>
                                    <Box pt={3}>
                                        <ContentTextarea content={content} changeContent={setContent} />
                                    </Box>
                                </Paper>
                            </Box>
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

export async function getServerSideProps() {
    const db = await database()

    const about:IAbout = await db.collection('content').findOne({'component': 'about'})

    return {props: {dbContent: about.content}}
}