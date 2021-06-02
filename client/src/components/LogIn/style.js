import { makeStyles } from '@material-ui/core';
import { PRIMARY_COLOR } from '../../styles/colors';
const makeStyle = makeStyles({
    main: {
        display: "flex",
        justifyContent: "center",
        padding:25
    },
    header_title: {
        fontWeight: "bold"
    },
    logoPrincipale:{
        color:PRIMARY_COLOR,
        fontSize:"4em"
    },
    large_input: {
        width: "100%"
    },
    margin: {
        margin: 7,
        width: "100%",
    },
    SingUpBtn: {
        borderRadius: 40,
        height:45
    },
})

export default makeStyle;