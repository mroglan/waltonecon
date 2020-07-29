import {makeStyles} from '@material-ui/core/styles'
import {Box, Paper, Typography, Button} from '@material-ui/core'
import {useState, useMemo, Dispatch, useRef} from 'react'
import CardSelector from './CardSelector'
import ModifySelectedCard from './ModifySelectedCard'
import ClickToModifyMessage from './ClickToModifyMessage'
import {IClientResource} from '../../../database/modelInterfaces'

const useStyles = makeStyles(theme => ({
    greenButton: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    }
}))

interface Props {
    resources: IClientResource[];
    dispatch: Dispatch<{type: string; payload: any;}>;
}

export default function ModifyCard({resources, dispatch}:Props) {

    const [loading, setLoading] = useState(false)

    const [originalResources, setOriginalResources] = useState(resources)

    const editedResources:boolean[] = useMemo(() => {
        //console.log('resources', resources)
        return resources.map((resource, i) => {
            if(JSON.stringify(resource) === JSON.stringify(originalResources[i])) {
                return false
            }
            return true
        })
    }, [resources])

    const [selectedResource, setSelectedResource] = useState(-1)

    const currentCardUpdateInfo = useRef<IClientResource>()

    const saveChanges = async () => {

        setLoading(true)

        const resourcesCopy = [...resources]
        resourcesCopy[selectedResource] = currentCardUpdateInfo.current

        const changedResources = resourcesCopy.reduce((edited, current, i) => {
            if(JSON.stringify(current) === JSON.stringify(originalResources[i])) {
                return edited
            }
            return [...edited, current]
        }, [])

        const res = await fetch(`${process.env.BASE_ROUTE}/api/modifycards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                operation: 'modify',
                resources: changedResources
            })
        })

        setOriginalResources(resourcesCopy)

        setLoading(false)
    }

    const classes = useStyles()
    return (
        <Box>
            <CardSelector resources={resources} editedResources={editedResources}
            selectedResource={selectedResource} setSelectedResource={setSelectedResource} />
            {selectedResource > -1 ? <ModifySelectedCard resource={resources[selectedResource]}
            dispatch={dispatch} resourceIndex={selectedResource} cardRef={currentCardUpdateInfo} /> :
            <Box mt={3}>
                <ClickToModifyMessage />
            </Box> }
            {selectedResource > -1 && <Box maxWidth={500} textAlign="center" margin="0 auto">
                <Button className={classes.greenButton} disabled={loading} onClick={() => saveChanges()}>
                    Save All Card Changes
                </Button>
            </Box>}
        </Box>
    )
}