import {makeStyles} from '@material-ui/core/styles'
import {Typography, Box, Paper, FormControl, OutlinedInput, Button} from '@material-ui/core'
import {FormEvent, useState} from 'react'
import SuccessSnackbar from './items/SuccessSnackbar'
import ErrorSnackbar from './items/ErrorSnackbar'

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

    const [email, setEmail] = useState('')
    
    const [response, setResponse] = useState({
        type: '',
        message: ''
    })

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()

        if(!Boolean(email)) {
            setResponse({
                type: 'error',
                message: 'Please enter an email'
            })
            return
        }

        const res = await fetch(`${process.env.BASE_ROUTE}/api/addemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })

        if(res.status !== 200) {
            const json = await res.json()
            setResponse({
                type: 'error',
                message: json.msg
            }) 
            return
        }
        setEmail('')
        setResponse({type: 'success', message: 'Email added!'})
    }

    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={3}>
            <Typography variant="h6" className={classes.title}>
                Join our email list!
            </Typography>
            <form>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput placeholder="bob@gmail.com" required type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <Box textAlign="center" paddingTop={3}>
                    <Button variant="outlined" color="primary" type="submit" className={classes.button}
                    onClick={handleSubmit} >
                        Join
                    </Button>
                </Box>
            </form>
            {response.type === 'error' ? <ErrorSnackbar  message={response} setMessage={setResponse} /> : response.type === 'success' ?
            <SuccessSnackbar message={response} setMessage={setResponse} /> : null }
        </Paper>
    )
}