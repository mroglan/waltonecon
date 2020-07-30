import {makeStyles} from '@material-ui/core/styles'
import {Box, Button} from '@material-ui/core'
import {useState, Dispatch, useMemo} from 'react'
import DeleteCardSelector from './DeleteCardSelector'
import {IClientResource} from '../../../database/modelInterfaces'

const useStyles = makeStyles(theme => ({
    redButton: {
        backgroundColor: theme.palette.error.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    }
}))

interface Props {
    resources: IClientResource[];
    dispatch: Dispatch<{type: string; payload: any}>;
}

export default function DeleteCard({resources, dispatch}:Props) {

    const [deletedResources, setDeletedResources] = useState(resources.map(() => false))

    const [loading, setLoading] = useState(false)

    useMemo(() => {
        if(loading) {
            setDeletedResources(resources.map(() => false))
            setLoading(false)
        }
    }, [resources])

    const deleteCards = async () => {

        setLoading(true)

        const deletedIds = resources.reduce((ids:string[], resource, i) => {
            if(deletedResources[i]) {
                return [...ids, resource._id]
            }
            return ids
        }, [])

        const res = await fetch(`${process.env.BASE_ROUTE}/api/modifycards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                operation: 'delete',
                ids: deletedIds
            })
        })

        const remainingCards = resources.reduce((remaining:IClientResource[], resource, i) => {
            if(deletedResources[i]) {
                return remaining
            }
            return [...remaining, resource]
        }, [])

        dispatch({
            type: 'REPLACE_CARDS',
            payload: remainingCards
        })
    }

    const classes = useStyles()
    return (
        <Box>
            <DeleteCardSelector resources={resources} deletedResources={deletedResources} 
            setDeletedResources={setDeletedResources} />
            <Box textAlign="center" mt={3}>
                <Button variant="contained" disabled={loading} className={classes.redButton}
                onClick={() => deleteCards()} >
                    Delete Selected Cards
                </Button>
            </Box>
        </Box>
    )
}