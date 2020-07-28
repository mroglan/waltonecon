import {makeStyles} from '@material-ui/core/styles'
import {Box} from '@material-ui/core'
import TopicCards from '../competition/TopicCards'
import {useEffect} from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '1.2rem',
        lineHeight: theme.spacing(.2),
        marginBottom: theme.spacing(2),
        '& a': {
            color: '#1976d2',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    }
}))

interface Props {
    text: string;
}

export default function ContentBox({text}:Props) {

    const classes = useStyles()
    return (
        <Box className={classes.root} dangerouslySetInnerHTML={{__html: text}} />
    )
}