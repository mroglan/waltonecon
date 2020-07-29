import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography, Button} from '@material-ui/core'
import Inputs from './Inputs'
import {useState, useEffect, useMemo, useRef, Dispatch} from 'react'
import {IClientResource} from '../../../database/modelInterfaces'

const useStyles = makeStyles(theme => ({
    paper: {
        margin: '0 auto',
        maxWidth: 500,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        marginBottom: theme.spacing(3)
    },
}))

interface Props {
    resource: IClientResource;
    dispatch: Dispatch<{type: string; payload: any;}>;
    resourceIndex: number;
    cardRef: any; // type for a ref?
}

export default function ModifySelectedCard({resource:rawResource, dispatch, resourceIndex, cardRef}:Props) {

    const [resource, setResource] = useState(rawResource)
    
    const prevIndex = useRef<number>()
    const prevResource = useRef<IClientResource>()  

    const changeCardValue = (cardValue:string, value:string|string[]) => {
        const resourceCopy = {...resource}
        resourceCopy[cardValue] = value
        setResource(resourceCopy)
    }

    const addCardTopic = (index:number) => {
        const topics = resource.topics
        topics.splice(index, 0, '')
        changeCardValue('topics', topics)
    }

    const removeCardTopic = (index:number) => {
        const topics = resource.topics
        if(topics.length === 1) return
        topics.splice(index, 1)
        changeCardValue('topics', topics)
    }

    const modifyCardTopic = (index:number, value:string) => {
        const topics = resource.topics
        topics[index] = value
        changeCardValue('topics', topics)
    }

    const changeCardTopic = (operation:string, index:number, value?:string) => {
        if(operation === 'modify') return modifyCardTopic(index, value)
        if(operation === 'add') return addCardTopic(index + 1)
        removeCardTopic(index)
    }

    useMemo(() => {
        cardRef.current = resource
    }, [resource])

    useMemo(() => {
        setResource(rawResource)
        prevResource.current = resource
    }, [rawResource])

    useEffect(() => {
        if(isNaN(prevIndex.current) || prevIndex.current === resourceIndex) {
            prevIndex.current = resourceIndex
            prevResource.current = resource
            return
        }
        dispatch({
            type: 'MODIFY',
            payload: {
                index: prevIndex.current,
                newValues: prevResource.current
            }
        })
        prevIndex.current = resourceIndex
    }, [rawResource])

    const classes = useStyles()
    return (
        <Box mt={3} px={3}>
            <Paper elevation={3} className={classes.paper}>
                <Box textAlign="center">
                    <Typography variant="h6">
                        Modify Card
                    </Typography>
                </Box>
                <Inputs cardValues={resource} changeCardValue={changeCardValue} changeCardTopic={changeCardTopic} />
            </Paper>
        </Box>
    )
}