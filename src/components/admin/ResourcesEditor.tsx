import {makeStyles} from '@material-ui/core/styles'
import {Box, FormControlLabel, Select, Typography, MenuItem} from '@material-ui/core'
import {useState, useReducer} from 'react'
import {IClientResource} from '../../database/modelInterfaces'
import CreateCard from './resourceComponents/CreateCard'

interface Props {
    resources: IClientResource[]
}

interface ResourceReducerAction {
    type: string;
    payload: string;
}

const useStyles = makeStyles(theme => ({
    label: {
        paddingRight: theme.spacing(1)
    },
    formControlLabel: {
        marginLeft: 0
    }
}))

function resourcesReducer(state:IClientResource[], action:ResourceReducerAction) {
    switch(action.payload) {
        default:
            return state
    }
}

export default function ResourcesEditor({resources:dbResources}:Props) {

    const [resources, resourcesDispatch] = useReducer(resourcesReducer, dbResources)

    const [editingOption, setEditingOption] = useState('create-card')

    const classes = useStyles()
    return (
        <Box mt={3}>
            <Box>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>I want to</Typography>}
                labelPlacement="start"
                control={<Select value={editingOption} onChange={(e) => setEditingOption(e.target.value.toString())}
                variant="outlined" margin="dense">
                    <MenuItem value="create-card">
                        Create a new card
                    </MenuItem>
                    <MenuItem value="modify-card">
                        Modify an existing card
                    </MenuItem>
                </Select>} />
            </Box>
            <Box mt={3}>
                {editingOption === 'create-card' ? <CreateCard /> : ''}
            </Box>
        </Box>
    )
}