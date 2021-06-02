import { makeStyles, fade } from '@material-ui/core';
import { INACTIVE_COLOR3, INACTIVE_COLOR2, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from '../../styles/colors';
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
    mainAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: 10,
        position: "relative",
        top: -theme.spacing(10) / 2,
        fontSize: "2em",
        textTransform: "capitalize",

        border: PRIMARY_WHITE + " solid 3.5px",
        borderColor: PRIMARY_WHITE
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxHeight: 60,
    },
    editBtn: {
        borderRadius: 40,
        maxHeight: 40,
        margin: "2%"
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
        maxHeight: 60,
        top: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        border: INACTIVE_COLOR3 + " solid",
        borderWidth: 0,
        position: "sticky",
        backgroundColor: PRIMARY_WHITE,
        zIndex: 200,
        borderBottomWidth: 0.5,
        overflow: "hidden"
    },
    accueilRoot: {
        position: "relative",
        border: INACTIVE_COLOR3 + " solid",
        borderWidth: 0,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
    },
    header_text: {
        fontWeight: "bold",
        marginLeft: "2%"
    },
    header_text_secondry: {
        color: INACTIVE_COLOR2
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
    arrowGoBack: {
        marginLeft: "2%"
    },
    headerTextContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "2%"
    },
    coverImageContainer: {
        maxHeight: 200,
        width: "100%",
        overflow: "hidden"
    },
    abonnementInfoContainer: {
        display: "flex",
        flexDirection: "row",
        marginRight: "1%",
        alignItems: "center"
    },
    freindSectionContainer: {
        marginTop: 5,
        display: "flex",
        flexDirection: "row"
    },
    mainTypo: {
        fontWeight: "bold",
        marginRight: "2%"

    },
    secodaryTypo: {
        color: INACTIVE_COLOR2,
    },
    profileTextContainer: {
        padding: "2%"
    },
    userElementContainer: {
        display: "flex",
        flexDirection: "row",
        borderBottom: INACTIVE_COLOR3 + " solid 0.8px",
        alignItems: "center",
        padding: "2%",
        justifyContent: "space-between"
    },
    removeFreinds: {
    },
    RightBar: {
        padding: 8,
        boxSizing: "border-box",

        position: "sticky",
        top: "0%",
        height: "100vh",
        overflow: "scroll",
        scrollbar: {
            width: 0
        }

    },
    search: {
        position: "sticky",
        top: "2%",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "4%"
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', zIndex: 10
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    rechercheInput: {
        backgroundColor: LIGHT_WHITE,
        width: "80%",
        borderRadius: 40,
        padding: 8
    },
    serachePanel: {
        backgroundColor: LIGHT_WHITE,
        width: "100%",
        padding: "2%",
        marginTop: "4%",
        position: "relative",
        '&:hover': {
            display: "block",
        },
    },


}))

export default makeStyle;