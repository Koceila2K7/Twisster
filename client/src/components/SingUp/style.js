import { makeStyles } from '@material-ui/core';
import { PRIMARY_COLOR } from '../../styles/colors';
const makeStyle = makeStyles({
    large_input: {
        width: "100%"
    },
    margin: {
        margin: 7
    },
    form: { padding: 20 },
    header_title: {
        margin: 7,
        fontWeight: "bold"
    },
    SingUpBtn: {
        borderRadius: 40,
        height:45
    },
    logoPrincipale: {
        color: PRIMARY_COLOR,
        fontSize: "3em",
        textAlign:"center"
    },
})

export default makeStyle;