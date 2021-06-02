import { Button } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';

const FLoating = ({ classes, openListeUser }) => {
    return (<Button variant="contained"
        onClick={openListeUser}
        color="primary"
        className={classes.NewMessageBtn}
    >
        <CreateIcon color="inherit" />
    </Button>)
}


export default FLoating