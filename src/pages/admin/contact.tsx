import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography} from '@material-ui/core'
import database from '../../database/database'
import {IContact} from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import {TMUIRichEditor} from '../../components/admin/editorInterfaces'
import ContentEditor from '../../components/admin/ContentEditor'
import {useRef} from 'react'
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

interface Props {
    content: {
        type: string;
        content: string;
    }[];
}

export default function Contact({content}:Props) {

    const textEditorRef = useRef<TMUIRichEditor>()

    const sendProgressToDb = async (content:string) => {

        const status = await updateContent([{type: 'contentEditorContent', content}], 'contact')

        return status
    }

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Admin Contact - Walton Economics Challenge</title>
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
                        <Paper className={classes.paper}>
                            <Box mb={3}>
                                <Box>
                                    <Typography variant="h5">
                                        Cusomize the Contact Information
                                    </Typography>
                                </Box>
                                <ContentEditor content={content[0].content} additionalControls={[]} customControls={[]} saveToDB={sendProgressToDb}
                                textEditorRef={textEditorRef} />
                            </Box>
                        </Paper>
                    </Box>
                </main>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const db = await database()

    const contactInfo:IContact = await db.collection('content').findOne({'component': 'contact'})

    return {props: {content: contactInfo.content}}
}

