import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography} from '@material-ui/core'
import database from '../../database/database'
import {IContact} from '../../database/modelInterfaces'
import Head from 'next/head'
import AdminHeader from '../../components/admin/AdminHeader'
import SideBar from '../../components/admin/SideBar'
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
    sideBar: {
        gridColumn: '1 / 2',
        background: '#F3F3ED',
    },
    header: {
        gridColumn: '1 / 3'
    },
    paper: {
        background: '#fff',
        padding: theme.spacing(3),
        maxWidth: 700,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 350
        }
    }
}))

interface Props {
    emails: string[];
}

export default function Emails({emails}:Props) {

    const classes = useStyles()
    return (
        <>
            <Head>
                <title>Admin Emails - Walton Economics Challenge</title>
            </Head>
            <div className={classes.root}>
                <header className={classes.header}>
                    <AdminHeader />
                </header>
                <aside className={classes.sideBar}>
                    <SideBar />
                </aside>
                <main className={classes.main}>
                    <Box mx={3}>
                        <Paper className={classes.paper}>
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    Emails:
                                </Typography>
                                <Typography variant="body1">
                                    {emails.join(', ')}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </main>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext) {

    const isAuth = await checkIsAuthenticated(ctx)

    if(!isAuth) {
        redirectToLogin(ctx)
    }

    const db = await database()

    const {emails} = await db.collection('emails').findOne({})

    return {props: {emails}}
}