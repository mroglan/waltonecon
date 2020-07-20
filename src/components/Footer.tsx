import {makeStyles} from '@material-ui/core/styles'
import {Grid, IconButton, Box, Typography} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
    typo: {
        color: '#000',
        wordBreak: 'break-word'
    },
    btn: {
        color: '#000'
    }
}))

export default function Footer() {

    const classes = useStyles()
    return (
        <Box borderTop="1px solid #000" pb={3} px={3}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center">
                        <Typography variant="body2" className={classes.typo}>
                            waltoneconchallenge@gmail.com
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center">
                        <a href="https://github.com/mroglan">
                            <IconButton className={classes.btn}>
                                <GitHubIcon />
                            </IconButton>
                        </a>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box textAlign="center">
                        <Typography variant="body2" className={classes.typo}>
                            &copy; 2020
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}