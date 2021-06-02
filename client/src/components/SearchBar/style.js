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
            textAlign:"center"

        },
       

    },
    drawerRoot: {
        position: "relative", width: "40%",
        [theme.breakpoints.down('lg')]: {
            width: "10  0%",

        },
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            justifyContent: "center",
            textAlign:"center"
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
        borderBottomWidth: 0.8,
        boxSizing: "border-box"
    },
    NewPostContainerAction: {
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
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
    clearPost: {
        position: "absolute",
        top: 50,
        right: 10,
        width: 50,
        height: 50
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
    RightBar: {
        padding: 8,
        boxSizing: "border-box",

        position: "sticky",
        top: "0%",
        height: "100vh",
        overflow: "scroll",
        scrollbar: {
            width: 0
        },
        [theme.breakpoints.down("sm")]: {
            display:'none'
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
    imageSelectionner: {
        width: '80%',
        height: "50%",
        margin: "auto"

    }


}))

export default makeStyle;