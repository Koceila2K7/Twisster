import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import { INACTIVE_COLOR, INACTIVE_COLOR2, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from '../Styles/Colors'

const EditText = ({ onChangeText, value, send }) => (
    <View style={styles.EditText}>
        <TextInput
            style={styles.TextInput}
            placeholder={"Tapez votre message ...."}
            value={value}
            onChangeText={onChangeText}
        />
        <TouchableOpacity
            style={styles.btn_send}
            onPress={send}
        >
            <Icon name="ios-send-sharp" color={PRIMARY_COLOR} size={30} />
        </TouchableOpacity>
    </View>
)

const MessageItem = (username) => ({ item }) => {
    let fromme = (username === item.from)
    let style = fromme ? styles.recevivedmessage : styles.sendedmessage;

    return (<View style={styles.messages_contianer}>
        <View style={style}>
            <Text style={styles.message}>{item.data}</Text>
        </View>
    </View>)
}
const MessageListe = ({ messages, username }) => {

    let conversation = messages.get(username);
    const flat_ref = useRef();
    useEffect(() => {
        if (flat_ref.current) {

            flat_ref.current.scrollToEnd({ animated: true })
        }
    }, [messages])
    return (conversation) ?
        (
            <FlatList
                ref={flat_ref}
                style={styles.body_contianer}
                data={conversation?.messages}
                renderItem={MessageItem(username)}
                keyExtractor={(item) => item.date}
            />

        )
        : (<View></View>)

}

const Header = ({ username, goBack, users }) => {
    let online = false;
    if (users.get(username)) {
        online = users.get(username).length > 0;
    }
    return (<View style={styles.header_contianer}>
        <TouchableOpacity
            onPress={goBack}
        >
            <Feather name="arrow-left" size={25} color={PRIMARY_COLOR} style={styles.arrow_left} />
        </TouchableOpacity>
        <Text style={styles.header_username}>{username}</Text>
        <View style={online ? styles.online : styles.notoline}>

        </View>
    </View>)
}
const ConversationSecreen = ({ navigation }) => {
    const messages = useSelector(state => state.maped_message)
    const username = useSelector(state => state.selected_user);
    const socketRef = useSelector(state => state.socket_ref)
    const users = useSelector(state => state.users)

    const [currentMessage, setCurrentMessage] = useState('');
    const onChangeText = txt => setCurrentMessage(txt);
    const goBack = () => navigation.goBack()
    const send = () => {
        let to = [];
        if (users.get(username)) {
            to = users.get(username)
        }
        let message = {
            from: socketRef.current.auth.username,
            content: currentMessage,
            to_username: username,
            to
        }

        socketRef.current.emit("private message", message)
        setCurrentMessage('');
    }
    return (
        <View style={styles.screen}>
            <Header username={username} goBack={goBack} users={users} />
            <MessageListe messages={messages} username={username} />
            <EditText onChangeText={onChangeText} send={send} value={currentMessage} />
        </View>
    )
}
const styles = StyleSheet.create({
    header_contianer: {
        height: 50,
        backgroundColor: PRIMARY_WHITE,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 7,
        position: "absolute",
        top: 0,
        width: "100%",
        shadowColor: INACTIVE_COLOR,
        elevation: 0.8
    },
    header_username: { fontSize: 20, fontWeight: "bold", marginRight: 10, marginLeft: 10 },
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
    screen: {
        flex: 1,
        backgroundColor: PRIMARY_WHITE,

    },
    EditText: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 7
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
    messages_contianer: {
        width: "100%",
        padding: 5
    },
    recevivedmessage: {
        backgroundColor: INACTIVE_COLOR,
        alignSelf: "flex-start",
        maxWidth: '60%',
        minWidth: '20%',
        padding: 10,
        minHeight: 20,
        borderRadius: 10
    },
    sendedmessage: {
        alignSelf: "flex-end",
        backgroundColor: PRIMARY_COLOR,
        maxWidth: '60%',
        minWidth: '20%',
        padding: 10,
        minHeight: 20,
        borderRadius: 10

    },
    message: {
        color: PRIMARY_WHITE
    },
    body_contianer: {
        marginTop: 50,
        marginBottom: 50,
    }

})

export default ConversationSecreen;



