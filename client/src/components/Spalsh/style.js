import { makeStyles } from '@material-ui/core';
import { PRIMARY_COLOR, PRIMARY_WHITE } from '../../styles/colors'
const makeStyle = makeStyles(theme => ({
    container:{
        maxWidth:"100%"
    },
    image_container: {
        boxSizing: "border-box",
        overflow: 'hidden',
        maxHeight: "100%",
        [theme.breakpoints.up('lg')]: {
            position: 'sticky',
            maxHeight: "100vh",
            top: 0,
        }

    },
    logo: {
        position: "relative",
        top: "-50%",
        left: "30%",
        color: PRIMARY_WHITE,
        fontSize: "40em",
        [theme.breakpoints.up('lg')]: {
            top: "-100%",
            left: "30%",
        }
    },
    top_btn_login: {
        padding: 15,
        width: 180,
        borderRadius: 40
    },
    maringR: {
        marginRight: 10
    },

    form: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        marginTop: 30
    },
    main: {
        marginTop: "10%"
    },
    logoPrincipale: {
        color: PRIMARY_COLOR,
        fontSize: "5em",
    },
    Typography: {
        fontWeight: "bold",
        fontFamily: "Helvetica"
    },
    TypographyMain: {
        marginBottom: "5%"
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        marginTop: "3%",
        width: "50%"
    },

    btn_shape: {
        padding: 15,
        marginBottom: "2%",
        borderRadius: 40
    }
}))

export default makeStyle;