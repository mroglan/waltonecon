import {Paper, Grid, Box, Typography} from '@material-ui/core'

export default function ClickToModifyMessage() {

    return (
        <Paper elevation={3}>
            <Box px={6}>
                <Grid container alignItems="center" justify="center" style={{minHeight: 100}}>
                    <Grid item>
                        <Typography variant="h6">
                            Click on a card to modify it
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}