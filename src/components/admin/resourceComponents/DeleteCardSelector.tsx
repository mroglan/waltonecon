import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid} from '@material-ui/core'
import ResourceCard from '../../resources/ResourceCard'
import {IClientResource} from '../../../database/modelInterfaces'
import shortenDesc from '../../../utils/shortenDesc'
import {useMemo, MouseEvent, SetStateAction} from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'scroll',
    },
    gridItem: {
        minWidth: 300,
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        cursor: 'pointer'
    }
}))

interface Props {
    resources: IClientResource[];
    deletedResources: boolean[];
    setDeletedResources: SetStateAction<any>;
}

export default function DeleteCardSelector({resources:rawResources, deletedResources, setDeletedResources}:Props) {

    const resources = useMemo(() => {
        return shortenDesc(rawResources)
    }, [rawResources])

    const handleClick = (e:MouseEvent, index:number) => {
        e.preventDefault() // if editor clicks on the link, will not be redirected
        setDeletedResources(current => {
            const copy =[...current]
            copy[index] = !copy[index]
            return copy
        })
    }

    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Grid container alignItems="stretch" wrap="nowrap" >
                {resources.map((resource, i) => (
                    <Grid key={resource._id} item className={classes.gridItem} style={{
                        border: `${deletedResources[i] ? 2 : 1}px solid ${deletedResources[i] ? '#f50057' : '#000'}`,
                        borderRadius: 4
                    }} onClick={(e) => handleClick(e, i)}>
                        <ResourceCard resource={resource} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}