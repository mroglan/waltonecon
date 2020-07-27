import {useRef, useEffect, useState} from 'react'
import {Grid, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Editor, convertFromRaw, RichUtils} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html' // use this when converting to html for the actual webpage

const useStyles = makeStyles(theme => ({

}))

const styleMap = {
    'STRIKETHROUGH': {
        textDecoration: 'line-through'
    }
}

export default function ContentTextarea({editorState, setEditorState}) {

    //useEffect(() => console.log(editorState))

    const makeBold = (e) => {
        e.preventDefault()
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const makeUnderline = (e) => {
        e.preventDefault()
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
    }

    const classes = useStyles()
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item>
                    <Button variant="contained" onMouseDown={makeBold}>
                        Bold
                    </Button>
                    <Button variant="contained" onMouseDown={makeUnderline}>
                        Underline
                    </Button>
                </Grid>
            </Grid>
            <Editor editorState={editorState} editorKey="editor" onChange={(e) => setEditorState(e)}
            customStyleMap={styleMap} />
        </div>
    )
}
