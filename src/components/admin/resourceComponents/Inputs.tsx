import {Box, FormControlLabel, OutlinedInput, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    label: {
        fontSize: '1.1rem'
    },
    formControlLabel: {
        alignItems: 'initial',
        width: '100%',
        margin: 0
    }
}))

export default function Inputs({cardValues, changeCardValue}) {

    const classes = useStyles()
    return (
        <Box>
            <Box px={3} py={1}>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>Title</Typography>}
                labelPlacement="top"
                control={<OutlinedInput fullWidth margin="dense" placeholder="Hello world"
                value={cardValues.title} onChange={(e) => changeCardValue('title', e.target.value)} />} />
            </Box>
            <Box px={3} py={1}>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>Resource Type</Typography>}
                labelPlacement="top"
                control={<OutlinedInput fullWidth margin="dense" placeholder="Presentation, Practice test, etc."
                value={cardValues.resourceType} onChange={(e) => changeCardValue('resourceType', e.target.value)} />} />
            </Box>
            <Box px={3} py={1}>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>Topic</Typography>}
                labelPlacement="top"
                control={<OutlinedInput fullWidth margin="dense" placeholder="Microeconomics, Macroeconomics, etc."
                value={cardValues.econType} onChange={(e) => changeCardValue('econType', e.target.value)} />} />
            </Box>
            <Box px={3} py={1}>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>Link</Typography>}
                labelPlacement="top"
                control={<OutlinedInput fullWidth margin="dense" placeholder="https://the_goole_drive.com"
                value={cardValues.fileLink} onChange={(e) => changeCardValue('fileLink', e.target.value)} />} />
            </Box>
            <Box px={3} py={1}>
                <FormControlLabel className={classes.formControlLabel}
                label={<Typography variant="subtitle1" className={classes.label}>Description</Typography>}
                labelPlacement="top"
                control={<OutlinedInput fullWidth margin="dense"
                placeholder="This presentation is..." multiline rows={4} rowsMax={10}
                value={cardValues.desc} onChange={(e) => changeCardValue('desc', e.target.value)} />} />
            </Box>
        </Box>
    )
}