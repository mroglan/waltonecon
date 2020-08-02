import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Grid, IconButton, Drawer, List, ListItem, Divider} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'
import {useState} from 'react'
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
    showSmDown: {
        [theme.breakpoints.up('sm')]: {
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
    },
    menuButton: {
        color: '#fff'
    },
    list: {
        width: 250,
        paddingTop: 0,
        color: '#fff',
        '& > div': {
            paddingTop: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #ccc'
        }
    },
    drawer: {
        background: theme.palette.primary.main
    }
}))

export default function Header() {

    const [openDrawer, setOpenDrawer] = useState(false)

    const redirectTo = (pathname:string) => {
        Router.push({
            pathname
        })
    }

    const classes = useStyles()
    return (
        <>
        <AppBar className={classes.root} position="sticky">
            <Toolbar style={{alignItems: 'center'}}>
                <Link href="/">
                    <a style={{textDecoration: 'none'}}>
                        <Grid container alignItems="center" wrap="nowrap" spacing={1}>
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
                    <Grid container wrap="nowrap" spacing={3}>
                        <Grid item>
                            <Link href="/competition">
                                <a className={classes.link}>
                                    <Typography variant="button">
                                        Competition
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/resources">
                                <a className={classes.link}>
                                    <Typography variant="button">
                                        Resources
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/contact">
                                <a className={classes.link}>
                                    <Typography variant="button">
                                        Contact
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.showSmDown}>
                    <IconButton className={classes.menuButton} onClick={() => setOpenDrawer(true)} >
                        <MenuIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer anchor="left" classes={{paper: classes.drawer}} open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <List className={classes.list}>
                <ListItem button onClick={() => redirectTo('/competition')}>
                    <Typography variant="button">
                        Competition
                    </Typography>   
                </ListItem>
                <ListItem button onClick={() => redirectTo('/resources')}>
                    <Typography variant="button">
                        Resources
                    </Typography>
                </ListItem>
                <ListItem button onClick={() => redirectTo('/contact')}>
                    <Typography variant="button">
                        Contact
                    </Typography>
                </ListItem>
            </List>
        </Drawer>
        </>
    )
}