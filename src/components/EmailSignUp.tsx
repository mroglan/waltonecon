import {makeStyles} from '@material-ui/core/styles'
import {Typography, Box, Paper, FormControl, OutlinedInput, Button} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        background: '#F9F8F2',
        maxWidth: 350,
        margin: '0 auto', 
        padding: theme.spacing(3),
        //border: '3px solid #113F9D'
        border: '3px solid rgba(233, 21, 21, .9)'
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        color: '#113F9D'
    },
    button: {
        //borderColor: theme.palette.success.main
        padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        color: theme.palette.primary.main,
        '&:hover': {
            background: 'transparent',
            color: theme.palette.primary.dark
        }
    }
}))

export default function EmailSignUp() {

    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={3}>
            <Typography variant="h6" className={classes.title}>
                Join our email list!
            </Typography>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput placeholder="bob@gmail.com" />
            </FormControl>
            <Box textAlign="center" paddingTop={3}>
                <Button variant="outlined" color="primary" className={classes.button}>
                    Join
                </Button>
            </Box>
        </Paper>
    )
}