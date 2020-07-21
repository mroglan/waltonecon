import {makeStyles} from '@material-ui/core/styles'
import {Grid, Typography, Box, Card, CardContent, useMediaQuery} from '@material-ui/core'
import {useState} from 'react'

const useStyles = makeStyles(theme => ({
    gridItem: {
        padding: `0 ${theme.spacing(3)}px`,
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                top: '50%',
                left: 0,
                border: `1px solid ${theme.palette.primary.main}`,
                zIndex: 0
            }
        }
    },
    card: {
        height: '100%',
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        zIndex: 2,
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

export default function TopicCards() {

    const [cardOpen, setCardOpen] = useState(false)

    const stacked = useMediaQuery('(max-width:960px)')

    const classes = useStyles()
    return (
        <Grid container spacing={stacked ? 3 : 0} alignItems={cardOpen ? 'center' : 'stretch'}>
            <Grid className={classes.gridItem} item xs={12} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                        <Box textAlign="center" py={1}>
                            <Typography variant="h6">
                                Microeconomics
                            </Typography>
                        </Box>
                        <Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                        <Box textAlign="center" py={1}>
                            <Typography variant="h6">
                                Macroeconomics
                            </Typography>
                        </Box>
                        <Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid className={classes.gridItem} item xs={12} md={4}>
                <Card className={classes.card} variant="outlined">
                    <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                        <Box textAlign="center" py={1}>
                            <Typography variant="h6">
                                International Economics
                            </Typography>
                        </Box>
                        <Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}