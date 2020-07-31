import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Grid, Button} from '@material-ui/core'
import Link from 'next/link'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 12
    },
    img: {
        maxWidth: 40,
        maxHeight: 40
    }, 
    title: {
        color: '#fff'
    },
    showSmUp: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'inline-block',
        padding: `${theme.spacing(.5)}px 0`,
        borderBottom: '1px solid transparent',
        transition: 'border-bottom 300ms ease-in-out',
        '&:hover': {
            borderBottom: '1px solid #fff'
        },
        cursor: 'pointer'
    }
}))

export default function Header() {

    const logout = async () => {

        const res = await fetch(`${process.env.BASE_ROUTE}/api/logout`, {
            method: 'POST'
        })
        if(res.status !== 200) {
            console.log('something went wrong')
            return
        }
        Router.push('/admin/login')
    }

    const classes = useStyles()
    return (
        <AppBar className={classes.root} position="sticky">
            <Toolbar style={{alignItems: 'center'}}>
                <Link href="/admin">
                    <a style={{textDecoration: 'none'}}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <img src="/waltonLogo.png" alt="Walton Logo" className={classes.img} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" className={classes.title} style={{paddingRight: '1rem'}}>
                                    Admin
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
                <div style={{flexGrow: 1}} />
                <div className={classes.showSmUp}>
                    <a className={classes.link}>
                        <Typography variant="button" onClick={() => logout()}>
                            Logout
                        </Typography>
                    </a>
                </div>
            </Toolbar>
        </AppBar>
    )
}