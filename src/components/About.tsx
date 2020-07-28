import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper, Box, Typography} from '@material-ui/core'
import getHTMLFromContentState from '../utils/getHTMLFromContentState'
import ContentBox from './items/ContentBox'

const useStyles = makeStyles(theme => ({
    root: {
        background: '#fff',
        padding: theme.spacing(3),
        maxWidth: 1000
    }
}))

interface Props {
    content: string;
}

export default function About({content}:Props) {

    const htmlText = getHTMLFromContentState(content)
    //console.log(htmlText)

    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={3}>
            <ContentBox text={htmlText} />
        </Paper>
    )
}

/*

Here is the original hard-coded about section: (what is now the ContentBox)

<Box>
    <Typography variant="body1" className={classes.content}>
        The Walton Economics Challenge is a competition club that participates in 
        the <a href="https://www.councilforeconed.org/national-economics-challenge/" className={classes.link}>National Economics Challenge</a> by
        the Council for Economic Education. 
    </Typography>
    <Typography variant="body1" className={classes.content}>
        We meet every Friday afternoon in room Mr. Dewar's room (417) (usually with food!). Every meeting we cover
        a topic that will likely be in the competition, and we also work on any specific questions members have. Even if you are
        not a member, you are still invited to come with any questions you have about economics!
    </Typography>
    <Typography variant="body1" className={classes.content}>
        Later in the year a team of 4 club members is selected to participate in the National Economics Challenge in the Adams
        Smith division. Depending on how many members are new to economics, we may also have another team of 4 participate in the 
        David Ricardo division.
    </Typography>
</Box>

*/