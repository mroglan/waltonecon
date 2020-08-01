import {makeStyles} from '@material-ui/core/styles'
import {Tab, Tabs, Typography, Box, useMediaQuery} from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
    section: {
        borderBottom: '1px solid #8D8D89'
    },
    text: {
        fontSize: '1.3rem',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.dark
        }
    }
}))

export default function SideBar() {

    const mobileScreen = useMediaQuery('(max-width:600px)')

    const classes = useStyles()
    return (
        <Box mx="auto" pl={5} pr={3} height="100%" component="nav">
            <Box py={1} pl={1} component="section" className={classes.section}>
                <Link href="/admin/about">
                    <a className={classes.link}>
                        <Typography variant="button" className={classes.text}>
                            About
                        </Typography>
                    </a>
                </Link>
            </Box>
            <Box py={1} pl={1} component="section" className={classes.section}>
                <Link href="/admin/competition">
                    <a className={classes.link}>
                        <Typography variant="button" className={classes.text}>
                            Competition
                        </Typography>
                    </a>
                </Link>
            </Box>
            <Box py={1} pl={1} component="section" className={classes.section}>
                <Link href="/admin/resources">
                    <a className={classes.link}>
                        <Typography variant="button" className={classes.text}>
                            Resources
                        </Typography>
                    </a>
                </Link>
            </Box>
            <Box py={1} pl={1} component="section" className={classes.section}>
                <Link href="/admin/contact">
                    <a className={classes.link}>
                        <Typography variant="button" className={classes.text}>
                            Contact
                        </Typography>
                    </a>
                </Link>
            </Box>
            <Box py={1} pl={1} component="section" className={classes.section}>
                <Link href="/admin/emails">
                    <a className={classes.link}>
                        <Typography variant="button" className={classes.text}>
                            Email List
                        </Typography>
                    </a>
                </Link>
            </Box>
        </Box>
    )
}