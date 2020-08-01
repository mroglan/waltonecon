import {Snackbar, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

const emptyMessage = {
    type: '',
    message: ''
}

const useStyles = makeStyles(theme => ({
    errorMsg: {
        background: theme.palette.error.main
    }
}))

export default function SuccessSnackbar({message, setMessage}) {

    const classes = useStyles()
    return (
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={Boolean(message)} onClose={(e) => setMessage(emptyMessage)}
        message={message.message} autoHideDuration={6000} ContentProps={{classes: {
            root: classes.errorMsg
        }}} action={
            <IconButton size="small" aria-label="close" onClick={(e) => setMessage(emptyMessage)} style={{color: '#fff'}} >
                <CloseIcon />
            </IconButton>
        } />
    )
}