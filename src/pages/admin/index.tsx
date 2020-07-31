import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/admin/SideBar'
import AdminHeader from '../../components/admin/AdminHeader'
import Head from 'next/head'
import {GetServerSidePropsContext} from 'next'
import checkIsAuthenticated from '../../utils/checkIsAuthenticated'
import {redirectToLogin} from '../../utils/serverSideRedirect'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        gridTemplate: 'auto 1fr auto / minmax(200px, 25%) 1fr'
    },
    main: {
        gridColumn: '2 / 3',
        background: '#F3F3ED'
    },
    footer: {
        gridColumn: '1 / 3',
        background: '#F3F3ED'
    },
    paper: {
        background: '#fff',
        padding: theme.spacing(3),
        maxWidth: 1000,
        margin: '0 auto'
    },
    mainGrid: {
        paddingTop: theme.spacing(3),
    },
    sideBar: {
        gridColumn: '1 / 2',
        background: '#F3F3ED',
    },
    header: {
        gridColumn: '1 / 3'
    }
}))

export default function Admin() {

    const classes = useStyles()
    return (
        <>
        <Head>
            <title>Admin - Walton Economics Challenge</title>
        </Head>
        <div className={classes.root}>
            <header className={classes.header}>
                <AdminHeader />
            </header>
            <aside className={classes.sideBar}>
                <SideBar />
            </aside>
            <main className={classes.main}>
                <div className={classes.mainGrid}>
                    <Box px={3}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={10} md={9} lg={8}>
                                <Box>
                                    <Box textAlign="center">
                                        <Typography variant="h2" component="h1">
                                            Hello, Admin!
                                        </Typography>
                                    </Box>
                                    <Box pt={3} textAlign="center">
                                        <Typography variant="h5">
                                            Welcome to the administrator page. Customize any of the pages on the site 
                                            as needed.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </main>
            <footer className={classes.footer}>
                <Footer />
            </footer>
        </div>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
    const isAuth = await checkIsAuthenticated(ctx)

    if(!isAuth) {
        redirectToLogin(ctx)
    }

    return {props: {}}
}
