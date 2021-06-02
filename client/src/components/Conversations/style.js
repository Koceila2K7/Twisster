import { makeStyles, fade } from '@material-ui/core';
import { INACTIVE_COLOR, INACTIVE_COLOR2, INACTIVE_COLOR3, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from '../../styles/colors';
const makeStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 7,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 70,
        backgroundColor: PRIMARY_WHITE,
        borderBottomWidth: 0.2,
        marginBottom: 0.2,
        marginTop: 0.2,
        borderBottomColor: INACTIVE_COLOR,
        boxSizing: "border-box",


    },
    messages_contianer_received: {
        width: "100%",
        padding: 5,
        marginTop: 2,
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        justifyContent: "flex-start"

    },

    messages_contianer_sended: {
        width: "100%",
        padding: 5,
        marginTop: 2,
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        justifyContent: "flex-end"

    },
    recevivedmessage: {
        backgroundColor: INACTIVE_COLOR,
        alignSelf: "flex-start",
        maxWidth: 60,
        minWidth: '20%',
        minHeight: 60,
        padding: 10,
        minHeight: 20,
        borderRadius: 10
    },
    sendedmessage: {
        backgroundColor: PRIMARY_COLOR,
        maxWidth: 60,
        minWidth: '20%',
        padding: 10,
        minHeight: 20,
        borderRadius: 10

    },
    message: {
        color: PRIMARY_WHITE
    },

    header_text: {
        fontWeight: "bold",
        marginLeft: "102%",
        marginRight: "2%"
    },
    onLine: { margin: "1%", width: 20, height: 20, backgroundColor: "green", borderRadius: "50%" },

    offline: { margin: "1%", width: 20, height: 20, backgroundColor: INACTIVE_COLOR, borderRadius: "50%" },
    panelContinaer: {},
    header: {
        height: 45,
        top: 0,
        width: "100%",
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        border: INACTIVE_COLOR3 + " solid",
        borderWidth: 0,
        position: "sticky",
        backgroundColor: PRIMARY_WHITE,
        zIndex: 200,
        borderBottomWidth: 0.5
    },
    header_text: {
        fontWeight: "bold",
        marginLeft: "2%"
    },

    avatar: {
        marginRight: 10
    },
    body_contianer: {
    },
    user_and_message_container: {
        flex: 1,
        width: "100%",
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    username: {
        fontSize: 14,
        fontWeight: "bold",
    },
    date: {
        fontSize: 11,
        color: INACTIVE_COLOR2
    },
    last_message: {
        fontSize: 11,
        color: INACTIVE_COLOR2
    },
    user_container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    EditText: {
        boxSizing: "border-box",
        position: "absolute",
        bottom: 0,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding:10,
        backgroundColor:PRIMARY_WHITE
    },
    TextInput: {
        flex: 8.75,
        backgroundColor: LIGHT_WHITE,
        borderColor: INACTIVE_COLOR2,
        borderWidth: 0.3,
        borderRadius: 20,
        padding: 7,
        marginRight: 7
    },
    btn_send: {
        flex: 1.25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    scorllToBottom: {
        position: "sticky",
        top:0,
        boxSizing:'border-box',
        padding: "5% 0",
        overflow: "auto",
        flex: "auto",
        maxHeight:"89vh",
    }
}))

export default makeStyle;