import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { USER_NAME_KEY } from "../../constants";
import useStyle from "./style"

const DrawerItem = ({ nom, current, action, icon, outlinedIcon }) => {
    let style = useStyle();
    let history = useHistory();
    const username = localStorage.getItem(USER_NAME_KEY);

    return (
        <div
            key={action}
            onClick={action(history, username)}
            className={current ? style.drawerItemCurrent : style.drawerItem}
        >
            <div className={style.icon}>{current ? icon() : outlinedIcon()}</div>
            <Typography variant="h6" className={style.typography}>
                {nom}
            </Typography>
        </div>)
}

export default DrawerItem;