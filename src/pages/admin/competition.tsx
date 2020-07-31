import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Button} from '@material-ui/core'
import database from '../../database/database'
import { ICompetition } from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/Footer'
import ContentEditor from '../../components/admin/ContentEditor'
import {useState, useEffect, useRef, useMemo} from 'react'
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import TopicCards from '../../components/competition/TopicCards'
import {TMUIRichEditor} from '../../components/admin/editorInterfaces'
import updateContent from '../../utils/requests/updateContent'
import {GetServerSidePropsContext} from 'next'
import checkIsAuthenticated from '../../utils/checkIsAuthenticated'
import {redirectToLogin} from '../../utils/serverSideRedirect'

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
        maxWidth: 700,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 350
        }
    }
}))

export default function Competition({content}) {

    const textEditor1Ref = useRef<TMUIRichEditor>()
    const textEditor2Ref = useRef<TMUIRichEditor>()

    const currentContent = useRef<any[]>()
    useMemo(() => {
        currentContent.current = content
    }, [])

    const sendFirstSectionProgressToDb = async (content:string) => {
        currentContent.current[0] = {type: 'contentEditorContent', content}

        const status = await updateContent(currentContent.current, 'competition')

        //console.log('status', status)
        return status
    }

    const sendSecondSectionToDb = async (content:string) => {

        currentContent.current[2] = {type: 'contentEditorContent', content}

        const status = await updateContent(currentContent.current, 'competition')

        return status
    }

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Admin Competition - Walton Economics Challenge</title>    
            </Head>
            <div className={classes.root}>
                <header className={classes.header}>
                    <AdminHeader />
                </header>
                <aside className={classes.sideBar}>
                    <SideBar />
                </aside>
                <main className={classes.main}>
                    <Box mx={3}>
                        <Paper className={classes.paper} elevation={0}>
                            <Box>
                                <Typography variant="h5">
                                    Customize the Competition section content
                                </Typography>
                            </Box>
                            <ContentEditor content={content[0].content} additionalControls={[]}
                             customControls={[]}
                             saveToDB={sendFirstSectionProgressToDb}
                             textEditorRef={textEditor1Ref} />
                             <Box mt={4}>
                                <TopicCards />
                             </Box>
                             <ContentEditor content={content[2].content} additionalControls={[]}
                             customControls={[]} saveToDB={sendSecondSectionToDb} textEditorRef={textEditor2Ref} />
                        </Paper>
                    </Box>
                </main>
                <footer className={classes.footer}>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {

    const isAuth = await checkIsAuthenticated(ctx)

    if(!isAuth) {
        redirectToLogin(ctx)
    }

    const db = await database()

    const competitionInfo:ICompetition = await db.collection('content').findOne({'component': 'competition'})

    return {props: {content: competitionInfo.content}}
}