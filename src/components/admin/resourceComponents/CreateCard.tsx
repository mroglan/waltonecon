import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography, FormControlLabel, OutlinedInput} from '@material-ui/core'
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
    }
}))

export default function CreateCard() {

    const [cardValues, setCardValues] = useState({
        title: '',
        resourceType: '',
        econType: '',
        fileLink: '',
        desc: '',
        topics: ['']
    })

    const changeCardValue = (cardValue:string, value:string) => {
        setCardValues(currentValue => (
            {...currentValue, [cardValue]: value}
        ))
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
                <Inputs cardValues={cardValues} changeCardValue={changeCardValue} />
            </Paper>
        </Box>
    )
}