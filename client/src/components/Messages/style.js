import { makeStyles, fade } from '@material-ui/core';
import { INACTIVE_COLOR, INACTIVE_COLOR3, INACTIVE_COLOR2, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from '../../styles/colors';
const makeStyle = makeStyles(theme => ({
    drawerContainer: {
        position: "sticky",
        top: 0,
        display: 'flex',
        justifyContent: "flex-end",
        height: "100vh",
        padding: 10,
        overflow: "hidden",
        [theme.breakpoints.down('lg')]: {
            justifyContent: "center",

        },
    },
    drawerRoot: {
        position: "relative", width: "40%",
        [theme.breakpoints.down('lg')]: {
            width: "10  0%",

        },
    },
    logoPrincipale: {
        color: PRIMARY_COLOR,
        fontSize: 30,
        textAlign: "center"
    },
    drawerItemCurrent: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        height: 50,
        minWidth: 40,
        boxSizing: "border-box",
        color: PRIMARY_COLOR,
        borderRadius: 40,
        paddingLeft: 15,
        paddingRight: 15,
        border: `solid 0.5px`,
        borderColor: "#fff",
        margin: 5,
        "&:hover, &:focus": {
            backgroundColor: LIGHT_WHITE,
            borderColor: PRIMARY_COLOR,
        }
    },
    drawerItem: {
        boxSizing: "border-box",
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        height: 50,
        fontWeight: "bold",
        margin: 5,
        borderRadius: 40,
        paddingLeft: 15,
        paddingRight: 15,
        border: `solid 0.5px`,
        borderColor: "#fff",
        "&:hover, &:focus": {
            backgroundColor: LIGHT_WHITE,
            borderColor: PRIMARY_COLOR,
            color: PRIMARY_COLOR
        }
    },
    typography: {
        fontWeight: 700,
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            display: "none"

        },
    },
    icon: {
        marginRight: 20,
        [theme.breakpoints.down('lg')]: {
            margin: 0

        },
    },
    online: {
        height: 10,
        width: 10,
        backgroundColor: "green",
        borderRadius: 30
    },
    notoline: {
        height: 10,
        width: 10,
        backgroundColor: INACTIVE_COLOR,
        borderRadius: 30
    },
    current: {
        color: PRIMARY_COLOR
    },
    twistter: {
        height: 40,
        marginTop: 10,
        width: "100%",
        borderRadius: 40,
        fontSize: "1em",
        fontWeight: "bold"

    },
    bottomProfil: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        elevation: 0,
        display: "flex",
        flexDirection: "row",
        border: `solid 0.5px`,
        borderColor: "#fff",
        borderRadius: 40,
        "&:hover, &:focus": {
            backgroundColor: LIGHT_WHITE,
            borderColor: PRIMARY_COLOR,
        }
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 10
    },
    bottomProfilText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        [theme.breakpoints.down('md')]: {
            display: "none"

        },

    },
    secodaryText: {
        color: INACTIVE_COLOR2

    },
    header: {
        height: 45,
        top: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        border: INACTIVE_COLOR3 + " solid",
        borderWidth: 0,
        position: "sticky",
        backgroundColor: PRIMARY_WHITE,
        zIndex: 200,
        borderBottomWidth: 0.5
    },
    accueilRoot: {
        border: INACTIVE_COLOR3 + " solid",
        borderWidth: 0,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
    },
    header_text: {
        fontWeight: "bold",
        marginLeft: "2%"
    },

    send: {
        height: 40,
        marginTop: 10,
        width: "18%",
        borderRadius: 40,
        fontSize: "0.8em",
        fontWeight: "bold"
    },
    NewPostContainer: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        border: INACTIVE_COLOR3 + " solid ",
        borderWidth: 0,
        borderBottomWidth: 0.8
    },
    NewPostContainerAction: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        width: "100%",
        alignItems: "center",
        paddingTop: 10,
        marginTop: 10,
        border: INACTIVE_COLOR3 + " solid ",
        borderWidth: 0,
        borderTopWidth: 0.8

    },
    NewPostContainerBody: {
        width: "100%"
    },
    TextField: {
        marginTop: 20,
        height: 42,
        fontSize: 18,
    },
    NewPostContainerAction2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    NewMessageBtn: {
        borderRadius: 50,
        padding: 10,
        height: 60,
        zIndex: 50,
        width: 60,
        position: "fixed",
        bottom: 50, left: "52%",
        [theme.breakpoints.down('md')]: {
            bottom: 50, left: "20%",
        },

    },
    CardActionArea: {
        padding: 7,


    },
    UserItemContainer: {
        minWidth: 250,
        elevation: 7,
        margin: 2,
        boxShadow: '3px 3px 3px ' + INACTIVE_COLOR3
    },
    CardActionAreaContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    logoPrincipale: {
        color: PRIMARY_COLOR,
        fontSize: 30,
        textAlign: "center"
    },
    header_title: {
        fontWeight: "bold",
        margin: 5
    },
    usernameTitle: {
        textTransform:"capitalize",
        fontWeight:"bold"
    }

}))

export default makeStyle;