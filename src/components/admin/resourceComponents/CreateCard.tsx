import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography, Button} from '@material-ui/core'
import Inputs from './Inputs'
import {useState} from 'react'

const useStyles = makeStyles(theme => ({
    paper: {
        margin: '0 auto',
        maxWidth: 500,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        marginBottom: theme.spacing(3)
    },
    label: {
        fontSize: '1.1rem'
    },
    formControlLabel: {
        alignItems: 'initial',
        width: '100%',
        margin: 0
    },
    greenButton: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            //backgroundColor: theme.palette.success.dark
        }
    }
}))

const defaultCardValues = {
    title: '',
    resourceType: '',
    econType: '',
    fileLink: '',
    desc: '',
    topics: [''],
}

export default function CreateCard({dispatch}) {

    const [cardValues, setCardValues] = useState(defaultCardValues)

    const [loading, setLoading] = useState(false)

    const changeCardValue = (cardValue:string, value:string) => {
        setCardValues(currentValues => (
            {...currentValues, [cardValue]: value}
        ))
    }

    const addCardTopic = (index:number) => {
        const topics = cardValues.topics
        topics.splice(index, 0, '')
        setCardValues(currentValues => (
            {...currentValues, topics}
        ))
    }

    const removeCardTopic = (index:number) => {
        const topics = cardValues.topics
        if(topics.length === 1) return
        topics.splice(index, 1)
        setCardValues(currentValues => (
            {...currentValues, topics}
        ))
    }

    const modifyCardTopic = (index:number, value:string) => {
        const topics = cardValues.topics
        topics[index] = value
        setCardValues(currentValues => (
            {...currentValues, topics}
        ))
    }

    const changeCardTopic = (operation:string, index:number, value?:string) => {
        if(operation === 'modify') return modifyCardTopic(index, value)
        if(operation === 'add') return addCardTopic(index + 1)
        removeCardTopic(index)
    }

    const createNewCard = async () => {
        setLoading(true)

        const res = await fetch(`${process.env.BASE_ROUTE}/api/modifycards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                operation: 'create',
                content: cardValues
            })
        })

        const json = await res.json()

        setLoading(false)
        setCardValues(currentValues => ({...defaultCardValues, topics: ['']}))
        dispatch({
            type: 'ADD_CARD',
            payload: json
        })
    }

    const classes = useStyles()
    return (
        <Box px={3}>
            <Paper elevation={3} className={classes.paper}>
                <Box textAlign="center">
                    <Typography variant="h6">
                        New Card
                    </Typography>
                </Box>
                <Inputs cardValues={cardValues} changeCardValue={changeCardValue} changeCardTopic={changeCardTopic} />
                <Box my={3} px={3}>
                    <Button variant="contained" className={classes.greenButton}
                    disabled={loading} onClick={() => createNewCard()}>
                        Create New Card
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}