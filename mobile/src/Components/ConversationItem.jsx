import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { INACTIVE_COLOR, INACTIVE_COLOR2, PRIMARY_WHITE } from '../Styles/Colors';

const ConversationItem = (userame, onPress) => ({ item }) => {
    let taille = item.messages.length;
    let last_message = item.messages[taille - 1];

    function get_last_message(messages) {

        return JSON.stringify(last_message.data)
    }
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => onPress(item.users.filter(i => i !== userame)[0])}
        >

            <Avatar.Image
                style={styles.avatar}
                source={{
                    uri: 'https://picsum.photos/700',
                }} size={62} />
            <View
                style={styles.user_and_message_container}
            >
                <View
                    style={styles.user_container}
                >
                    <Text style={styles.username}>
                        {item.users.filter(i => i !== userame)[0]}
                    </Text>
                    <Text style={styles.date}>
                        {last_message.date.split('T')[0]}
                    </Text>
                </View>

                <View style={styles.message_conatainer}>
                    <Text style={styles.last_message}>{get_last_message(item)}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
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
        borderBottomColor: INACTIVE_COLOR

    },
    avatar: {
        marginRight: 10
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
    }
});
export default ConversationItem
