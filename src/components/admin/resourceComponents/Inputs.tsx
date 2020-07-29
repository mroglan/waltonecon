import {Box, FormControlLabel, OutlinedInput, Typography, Grid, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme => ({
    label: {
        fontSize: '1.1rem'
    },
    formControlLabel: {
        alignItems: 'initial',
        width: '100%',
        margin: 0
    },
    redButton: {
        color: theme.palette.error.main
    },
    greenButton: {
        color: theme.palette.success.main
    }
}))

export default function Inputs({cardValues, changeCardValue, changeCardTopic}) {

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
            <Box px={3} py={1}>
                <Typography variant="subtitle1" className={classes.label}>Topics</Typography>
                {cardValues.topics.map((topic, i) => (
                    <Grid container spacing={3} alignItems="center" key={i}>
                        <Grid item style={{flexGrow: 1}}>
                            <OutlinedInput fullWidth margin="dense" placeholder={`Topic ${i + 1}`} value={topic}
                            onChange={(e) => changeCardTopic('modify', i, e.target.value)} />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <IconButton className={classes.redButton} onClick={() => changeCardTopic('remove', i)}>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.greenButton} onClick={() => changeCardTopic('add', i)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Box>
    )
}