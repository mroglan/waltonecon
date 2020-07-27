import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Button} from '@material-ui/core'
import database from '../../database/database'
import { IAbout } from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/Footer'
import ContentTextarea from '../../components/admin/ContentTextarea'
import ContentTextarea2 from '../../components/admin/ContentTextarea2'
import ContentTextarea3 from '../../components/admin/ContentTextarea3'
import {useState, useEffect, useRef} from 'react'
import Draft, {EditorState, convertFromHTML, ContentState, convertToRaw, convertFromRaw} from 'draft-js'

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
    },
    btn: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        color: '#fff'
    },
    btnSuccess: {
        backgroundColor: theme.palette.success.main
    }
}))

// const emptyContentState = Draft.convertFromRaw({
//     entityMap: {},
//     blocks: [
//       {
//         text: '',
//         key: 'foo',
//         type: 'unstyled',
//         entityRanges: [],
//         depth: undefined,
//         inlineStyleRanges: undefined
//       },
//     ],
//   });

type TAsyncAtomicBlockResponse = {
    data: any;
}

export type TMUIRichEditor = {
    focus: () => void;
    save: () => void;
    insertAtomicBlock: (name: string, data: any) => void
    insertAtomicBlockSync: (name: string, data: any) => void
    insertAtomicBlockAsync: (name: string, promise: Promise<TAsyncAtomicBlockResponse>, placeholder?: string) => void
}

export default function About({dbContent}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [content, setContent] = useState(dbContent) // change to what is in the db

    //const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyContentState))

    const textEditorRef = useRef<TMUIRichEditor>()

    useEffect(() => {
        // data in database is not html, so no need to convert...
        // const contentHTML = convertFromHTML(content)
        // const contentState = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
        
        // setContent(JSON.stringify(convertToRaw(contentState)))

        setContent(content)
    }, [])

    const saveProgress = () => {
        textEditorRef.current?.save()
        setLoading(true)
    }

    const sendProgressToDb = async (text:string) => {
        console.log('sending to db...')
        
        const req = await fetch(`${process.env.BASE_ROUTE}/api/updatecontent/about`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: text
            })
        })

        setLoading(false)

        if(req.status !== 200) {
            setError(true)
        }
    }

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
                    <Box mx={3}>
                        <Paper className={classes.paper} elevation={0}>
                            <Box>
                                <Typography variant="h5">
                                    Customize the About section content
                                </Typography>
                            </Box>
                            <Box pt={3}>
                                {/* <ContentTextarea content={content} changeContent={setContent} /> */}
                                {/* <ContentTextarea2 editorState={editorState} setEditorState={setEditorState} /> */}
                                <ContentTextarea3 content={content} inputRef={textEditorRef} sendProgress={sendProgressToDb} />
                            </Box>
                            <Box pt={3}>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Button variant="contained" className={`${classes.btn} ${classes.btnSuccess}`} 
                                        onClick={() => saveProgress()} disabled={loading}>
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
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

    const about:IAbout = await db.collection('content').findOne({'component': 'about'})

    return {props: {dbContent: about.content}}
}