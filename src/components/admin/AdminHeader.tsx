import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Grid, Button} from '@material-ui/core'
import Link from 'next/link'

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
        }
    }
}))

export default function Header() {

    const classes = useStyles()
    return (
        <AppBar className={classes.root} position="sticky">
            <Toolbar style={{alignItems: 'center'}}>
                <Link href="/">
                    <a style={{textDecoration: 'none'}}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <img src="/waltonLogo.png" alt="Walton Logo" className={classes.img} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" className={classes.title}>
                                    WEC
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
                <div style={{flexGrow: 1}} />
                <div className={classes.showSmUp}>
                    <Typography variant="h5" className={classes.title}>
                        Administrator
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    )
}