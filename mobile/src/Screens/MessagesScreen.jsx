import React, { useRef, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { MESSAGE_DESC, MESSAGE_SCREEN_TTILE, PROFILE_KEY, WRITE_NEW_MESSAGE } from "../constants";
import { INACTIVE_COLOR2, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";
import socket from '../Components/socket';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetch_conversations } from '../actions/messages';
import ConversationItem from "../Components/ConversationItem";
import { ADD_USER, REMOVE_USER, SET_SELECTED_USER, SET_SOCKET_REF, SET_USERS, UPDATE_MAPED_MESSAGE } from "../constants/actionstype";
import Header from "../Components/Header";




const ButtonSendMessage = ({ onPress }) => (
    <TouchableOpacity style={styles.fab}
        onPress={onPress}
    >
        <Icon name="new-message" color={PRIMARY_WHITE} size={25} />
    </TouchableOpacity>
)

const NonMessages = () => (<View style={styles.non_messages_container}>
    <Text style={styles.title}>{MESSAGE_SCREEN_TTILE}</Text>
    <Text style={styles.screen_description}>{MESSAGE_DESC}</Text>
    <TouchableOpacity style={styles.write_new_message_btn}>
        <Text style={styles.write_new_message_btn_text}>{WRITE_NEW_MESSAGE}</Text>
    </TouchableOpacity>
</View>)

const Body = ({ conversations, username, onPress }) => {

    return (
        conversations.length > 0 ?
            <FlatList
                data={conversations}
                renderItem={ConversationItem(username, onPress)}
                keyExtractor={(item) => item._id}
            />
            : <NonMessages />
    )
}


const MessageScreen = ({ navigation }) => {
    const socket_ref = useRef();
    const username_ref = useRef();
    const dispatch = useDispatch();
    const conversations = useSelector(state => state.conversations);
    const [have_new_message, set_have_new_message] = useState(false);
    const onPress = ()=>navigation.navigate('newmessageScreen')
    const navigate_to_conversation = username => {
        dispatch({ type: SET_SELECTED_USER, payload: username });
        navigation.navigate('conversationScreen');
        console.log(username)
    }


    useEffect(() => {
        socket_ref.current = socket;
    }, []);
    useEffect(() => {
        const get_id = async () => {
            let profile = await AsyncStorage.getItem(PROFILE_KEY);
            profile = JSON.parse(profile);
            if (profile.token) {
                let decode = jwtDecode(profile?.token);
                username_ref.current = decode.id;
                socket_ref.current.auth = { username: username_ref.current };
                socket_ref.current.connect();
                console.log('socket normalement connecter', decode.id)
                socket_ref.current.on('private message', (message) => set_have_new_message(old => !old))
                socket_ref.current.on('users', users => dispatch({ type: SET_USERS, payload: users }));
                socket_ref.current.on('user connected', user => dispatch({ type: ADD_USER, payload: user }));
                socket_ref.current.on('disconnected', user => dispatch({ type: REMOVE_USER, payload: user }))
                dispatch({ type: SET_SOCKET_REF, payload: socket_ref })
            }
        }
        get_id();
    }, []);

    useEffect(() => {
        dispatch({ type: UPDATE_MAPED_MESSAGE, payload: { messsages: conversations, username: username_ref.current } })
    }, [conversations])

    useEffect(() => {
        dispatch(fetch_conversations())
    }, [have_new_message]);

    return (
        <SafeAreaView style={styles.screen}>
            <Header navigation={navigation} />
            <Body conversations={conversations}
                username={username_ref.current}
                onPress={navigate_to_conversation}
            />
            <ButtonSendMessage onPress={onPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    screen_description: {
        textAlign: "justify",
        marginTop: 15,
        marginBottom: 15,
        color: INACTIVE_COLOR2
    },
    screen: {
        flex: 1,
        backgroundColor: LIGHT_WHITE
    },
    fab: {
        elevation: 7,
        shadowColor: "black",
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        margin: 16,
        padding: 15,
        right: 0,
        bottom: 0,
        borderRadius: 30
    },
    non_messages_container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    write_new_message_btn: {
        backgroundColor: PRIMARY_COLOR,
        padding: 7,
        paddingRight: 15,
        paddingLeft: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 5,
        shadowColor: "black",
    },

    write_new_message_btn_text: { color: PRIMARY_WHITE, fontWeight: "bold" }
})
export default MessageScreen;