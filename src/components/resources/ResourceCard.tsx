import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography, Card, CardContent, CardActions} from '@material-ui/core'
import {useState} from 'react'

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    resourceType: {
        //fontSize: 14
    },
    topicExpand: {
        display: 'inline-block',
        marginTop: theme.spacing(2)
    },
    link: {
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        },
        cursor: 'pointer'
    },
    list: {
        animation: '$enter 400ms',
    },
    '@keyframes enter': {
        '0%': {
            transform: 'translateY(-100%)'
        },
        '100%': {
            transfrom: 'translateY(0)'
        }
    }
}))

const formattedDate = (date:string) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return month + "/" + day + "/" + year
}

export default function ResourceCard({resource}) {

    const [viewTopics, setViewTopics] = useState(false)

    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Grid item>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                {resource.resourceType}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="textSecondary">
                                {formattedDate(resource.date)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box pt={1} pb={.5}>
                        <Typography variant="h5">
                            <a style={{textDecoration: 'none', color: 'inherit'}}
                            href={resource.fileLink} download={resource.title}>
                                {resource.title}
                            </a>
                        </Typography>
                    </Box>
                    <Typography variant="body2" style={{color: '#556cd6'}}>
                        {resource.econType}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box pt={2}>
                        <Typography variant="body1">
                            {resource.desc}
                        </Typography>
                    </Box>
                    {viewTopics && <Box overflow="hidden">
                        <ul className={classes.list}>
                            {resource.topics.map(topic => (
                                <li key={topic}>
                                    <Typography variant="subtitle1">
                                        {topic}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>}
                </Grid>
                <div style={{flexGrow: 1}} />
                <Grid item>
                    <Typography variant="body2" className={`${classes.link} ${classes.topicExpand}`}
                    onClick={() => setViewTopics(!viewTopics)}>
                        {viewTopics ? 'Hide Topics' : 'View Topics'}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    )
}