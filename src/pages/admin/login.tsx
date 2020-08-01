import {makeStyles} from '@material-ui/core/styles'
import {Paper, Box, Typography} from '@material-ui/core'
import {GoogleLogin, GoogleLoginResponse} from 'react-google-login'
import {GetServerSidePropsContext} from 'next'
import checkIsAuthenticated from '../../utils/checkIsAuthenticated'
import {redirectToAdminDashboard} from '../../utils/serverSideRedirect'
import Router from 'next/router'
import {useState} from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        background: '#F3F3ED',
        display: 'grid',
        placeItems: 'center'
    },
    paper: {
        maxWidth: 600,
        minHeight: 150,
        padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}))

function DisplayMessage({message}) {
    switch(message.type) {
        case 'error':
            return (
                <Typography variant="body1" color="error">
                    {message.content}
                </Typography>
            )
        case 'loading':
            return (
                <Typography variant="body1">
                    {message.content}
                </Typography>
            )
        default: 
            return <div></div>
    }
}

export default function Login() {

    const [message, setMessage] = useState({
        type: '',
        content: ''
    })

    const responseSuccess = async (response:GoogleLoginResponse) => {
    
        setMessage({type: 'loading', content: 'Signing you in'})

        const res = await fetch(`${process.env.BASE_ROUTE}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: response.tokenId
            })
        })

        if(res.status === 200) {
            Router.push({
                pathname: '/admin'
            })
        } else {
            setMessage({type: 'error', content: 'Failed to log you in'})
        }
    }

    const responseFail = (response:GoogleLoginResponse) => {
        console.log(response)
        setMessage({type: 'error', content: 'Failed to recieve response from Google'})
    }

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h5" component="h1">
                        Sign in with the WEC Gmail Account
                    </Typography>
                </Box>
                <Box textAlign="center" mb={3} px={3}>
                    <DisplayMessage message={message} />
                </Box>
                <Box textAlign="center">
                    <GoogleLogin clientId={process.env.GOOGLE_CLIENT_ID}
                    buttonText="Login with Google" 
                    onSuccess={responseSuccess} onFailure={responseFail} cookiePolicy="single_host_origin" /> 
                </Box>
            </Paper>
        </div>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
    
    const isAuthenticated = await checkIsAuthenticated(ctx)

    if(isAuthenticated) {
        redirectToAdminDashboard(ctx)
    }

    return {props: {}}
}