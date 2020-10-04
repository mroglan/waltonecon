import {makeStyles} from '@material-ui/core/styles'
import {Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, 
    OutlinedInput, InputAdornment, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import PurpleSwitch from '../items/Switch'
import {useState, useRef, KeyboardEvent} from 'react'

const useStyles = makeStyles(theme => ({
    select: {
        minWidth: '20ch'
    },
    filtersBox: {
        animation: '$appear 400ms'
    },
    '@keyframes appear': {
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1
        }
    },
    searchButton: {
        '&:hover': {
            color: 'hsl(229, 61%, 59%)'
        }
    }
}))

export default function Filters({filters, dispatch}) {

    const [showFilters, setShowFilters] = useState(false)
    const [search, setSearch] = useState('')

    const searchRef = useRef<HTMLButtonElement>()

    const toggleFilters = (val:boolean) => setShowFilters(val)

    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key === 'Enter') searchRef.current?.click()
    }

    const classes = useStyles()
    return (
        <Box>
            <Box>
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <PurpleSwitch checked={showFilters} setChecked={toggleFilters} label="Show filters" />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined">
                            <OutlinedInput id="search-bar" placeholder="Search..." onKeyPress={handleKeyPress}
                            value={search} onChange={(e) => setSearch(e.target.value.toString())} margin="dense"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton aria-label="Search" onClick={() => dispatch({
                                        type: 'changeSearch',
                                        payload: search
                                    })} className={classes.searchButton}
                                    edge="start" ref={searchRef}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            } endAdornment={Boolean(search) && <InputAdornment position="end">
                                <IconButton aria-label="Clear Search" onClick={() => {
                                    setSearch('')
                                    dispatch({
                                        type: 'changeSearch',
                                        payload: ''
                                    })
                                }} className={classes.searchButton} edge="end">
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>} />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            {showFilters && <Box pt={2} className={classes.filtersBox}>
                <Grid container spacing={3}>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel id="topic-select-label">Topic</InputLabel>
                            <Select labelId="topic-select-label" id="topic-select" 
                            value={filters.topic} onChange={(e) => dispatch({
                                type: 'changeTopic',
                                payload: e.target.value.toString()
                            })} label="Topic" className={classes.select}>
                                <MenuItem value="any">Any</MenuItem>
                                <MenuItem value="fundamentals">Fundamentals</MenuItem>
                                <MenuItem value="micro">Microeconomics</MenuItem>
                                <MenuItem value="macro">Macroeconomics</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel id="resource-type-select-label">Resource type</InputLabel>
                            <Select labelId="resource-type-select-label" id="resource-type-select"
                            value={filters.resourceType} onChange={(e) => dispatch({
                                type: 'changeResourceType',
                                payload: e.target.value.toString()
                            })} label="Resource type" className={classes.select}>
                                <MenuItem value="any">Any</MenuItem>
                                <MenuItem value="presentations">Presentations</MenuItem>
                                <MenuItem value="pProblems">Practice Problems</MenuItem>
                                <MenuItem value="quizizz">Quizizz</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>}
        </Box>
    )
}