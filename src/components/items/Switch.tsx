import {withStyles} from '@material-ui/core/styles'
import {Switch, FormControlLabel, Typography} from '@material-ui/core'

const PurpleSwitch = withStyles({
    switchBase: {
        color: 'hsl(229, 61%, 68%)',
        '&$checked': {
            color: 'hsl(229, 61%, 59%)'
        },
        '&$checked + $track': {
            backgroundColor: 'hsl(229, 61%, 59%)'
        }
    },
    checked: {},
    track: {}
})(Switch)

interface Props {
    checked: boolean;
    setChecked: any;
    label: string;
}

export default function MySwitch({checked, setChecked, label}:Props) {

    return (
        <FormControlLabel
        control={<PurpleSwitch checked={checked} onChange={() => setChecked(!checked)} name="Switch" />}
        label={<Typography style={{fontSize: 18}} variant="body1">{label}</Typography> } />
    )
}