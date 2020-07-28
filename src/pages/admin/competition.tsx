import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Button} from '@material-ui/core'
import database from '../../database/database'
import { ICompetition } from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/Footer'
import ContentEditor from '../../components/admin/ContentEditor'
import {useState, useEffect, useRef} from 'react'
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import TopicCards from '../../components/competition/TopicCards'
import {TMUIRichEditor} from '../../components/admin/editorInterfaces'
import updateContent from '../../utils/requests/updateContent'

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

    const textEditorRef = useRef<TMUIRichEditor>()

    const sendProgressToDb = async (text:string) => {
        console.log('sending to db...')
        
        const status = await updateContent(text, 'competition')

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
                            <ContentEditor content={content} additionalControls={['add-topic-cards']}
                             customControls={[{
                                 name: 'add-topic-cards',
                                 icon: <ViewColumnIcon />,
                                 type: 'callback',
                                 onClick: () => {
                                     textEditorRef.current?.insertAtomicBlockSync('topic-cards', {})
                                 }
                             }, {
                                 name: 'topic-cards',
                                 type: 'atomic',
                                 atomicComponent: TopicCards
                             }]}
                             saveToDB={sendProgressToDb}
                             textEditorRef={textEditorRef} />
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

export async function getServerSideProps() {
    const db = await database()

    const competitionInfo:ICompetition = await db.collection('content').findOne({'component': 'competition'})

    return {props: {content: competitionInfo.content}}
}