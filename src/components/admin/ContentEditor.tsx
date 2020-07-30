import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Button} from '@material-ui/core'
import {useState, useRef} from 'react'
import ContentTextarea from './ContentTextarea3'
import {TMUIRichEditor} from './editorInterfaces'

const useStyles = makeStyles(theme => ({
    btn: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        color: '#fff'
    },
    btnSuccess: {
        backgroundColor: theme.palette.success.main
    }
}))

export default function ContentEditor({content, saveToDB, additionalControls, customControls, textEditorRef}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const saveProgress = () => {
        textEditorRef.current?.save()
        setLoading(true)
    }

    const sendProgress = async (data:string) => {
        await saveToDB(data)
        console.log('we have returned...')
        setLoading(false)
    }

    const classes = useStyles()
    return (
        <Box>
            <Box pt={3}>
                <ContentTextarea content={content} inputRef={textEditorRef} sendProgress={sendProgress}
                additionalControls={additionalControls} customControls={customControls} />
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
        </Box>
    )
}