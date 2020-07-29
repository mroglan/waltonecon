import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Button} from '@material-ui/core'
import database from '../../database/database'
import { IResourcesText } from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/Footer'
import ContentEditor from '../../components/admin/ContentEditor'
import {TMUIRichEditor} from '../../components/admin/editorInterfaces'
import { useRef } from 'react'
import updateContent from '../../utils/requests/updateContent'
import ResourcesEditor from '../../components/admin/ResourcesEditor'

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

export default function Resources({content, resources}) {

    const textEditorRef = useRef<TMUIRichEditor>()

    const sendProgressToDb = async (content:string) => {

        const status = await updateContent([{type: 'contentEditorContent', content}], 'resources')

        return status
    }

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Admin Resources - Walton Economics Challenge</title>    
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
                            <Box mb={3}>
                                <Box>
                                    <Typography variant="h5">
                                        Customize the Resource section content
                                    </Typography>
                                </Box>
                                <ContentEditor content={content[0].content} additionalControls={[]} customControls={[]} saveToDB={sendProgressToDb}
                                textEditorRef={textEditorRef} />
                            </Box>
                            <hr style={{border: 0, background: '#ccc', height: 1}} />
                            <Box mt={3}>
                                <Box>
                                    <Typography variant="h5">
                                        Customize the Resource cards
                                    </Typography>
                                </Box>
                                <ResourcesEditor resources={resources} />
                            </Box>
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

    const [resourcesInfo, resources] = await Promise.all([
        db.collection('content').findOne({'component': 'resources'}),
        db.collection('resources').find({}).toArray()
    ])

    return {props: {content: resourcesInfo.content, resources: JSON.parse(JSON.stringify(resources))}}
}