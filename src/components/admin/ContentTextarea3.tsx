import MUIRichTextEditor  from 'mui-rte'
import {useState, useEffect} from 'react'
import {convertFromRaw} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import {Box} from '@material-ui/core'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import HighlightIcon from '@material-ui/icons/Highlight';
import LinkIcon from '@material-ui/icons/Link';

// no need for all the controls for this project :)
// const controls = [
//     "title", "bold", "italic", "underline", "strikethrough", "highlight",
//      "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear"
// ]

const theme = createMuiTheme()

Object.assign(theme, {
    overrides: {
        MUIRichTextEditor: {
            toolbar: {
                //borderTop: '1px solid #ccc'
                '& button': {
                    marginRight: '.1rem'
                }
            },
            editor: {
                border: '1px solid #ccc',
                '&:focus-within': {
                    borderColor: '#556cd6' 
                },
                minHeight: 100
            },
            editorContainer: {
                paddingLeft: '.5rem',
                paddingRight: '.5rem',
                fontSize: '1.2rem', 
                lineHeight: 1.6,
                marginBottom: 16,
                '& a': {
                    color: '#1976d2 !important'
                }
            }
        }
    }
})

const controls = [
    'bold', 'italic', 'underline', 'highlight', 'link', 'media', 'numberList', 'bulletList', 'undo', 'redo'
]

export default function ContentTextarea3({content, inputRef, sendProgress}) {

    const [onClientSide, setOnClientSide] = useState(false)

    useEffect(() => {
        setOnClientSide(true)
    }, [])

    const updateContent = (data) => {
        console.log(data) // this will show me what styles i have (e.g 'HIGHLIGHT', 'BOLD', etc.)

        // no need to store html in database...
        // const contentState = convertFromRaw(JSON.parse(data))
        // console.log('contentState', contentState)
        // const htmlText = stateToHTML(contentState, {
        //     inlineStyles: {
        //         HIGHLIGHT: {style: {backgroundColor: 'yellow'}}
        //     }
        // })
        // console.log(htmlText)
        sendProgress(data)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {onClientSide && <MUIRichTextEditor  ref={inputRef} label="Start typing..." defaultValue={content}
                 onSave={updateContent} controls={controls} />}
            </Box>
        </ThemeProvider>
    )
}