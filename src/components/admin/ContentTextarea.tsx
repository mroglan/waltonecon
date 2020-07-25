import {TextareaAutosize} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useRef} from 'react'

const useStyles = makeStyles(theme => ({
    textarea: {
        width: '100%',
        fontSize: '1.2rem',
        lineHeight: theme.spacing(.2),
        fontFamily: 'inherit'
    }
}))

export default function ContentTextarea({content, changeContent}) {

    const handleContentChange = (e) => {

        const lastChar = e.target.value[e.target.value.length - 1]

        if(lastChar === '\n' && !pressedBackspace.current) {
            e.target.value += '\n'
        }

        changeContent(e.target.value)
    }

    const pressedBackspace = useRef<boolean>() // will be false if did not press backspace, true if did

    const checkKeyPress = (e) => {
        if(e.keyCode === 8) pressedBackspace.current = true
        else pressedBackspace.current = false
    }

    const classes = useStyles()

    return (
        <TextareaAutosize rowsMin={10} className={classes.textarea}
        value={content} onChange={(e) => handleContentChange(e)}
        onKeyDown={(e) => checkKeyPress(e)} />
    )
}