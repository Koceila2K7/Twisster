import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUser } from '../api'
import Header from '../Components/Header'
import { SET_SELECTED_USER } from '../constants/actionstype'
import { INACTIVE_COLOR, LIGHT_WHITE, PRIMARY_WHITE } from '../Styles/Colors'


const UserItem = (conntedusers, myusername, onPress) => ({ item }) => {
    let online = false;
    let itme = item.userName === myusername;
    if (conntedusers.get(item.userName)) {
        online = conntedusers.get(item.userName).length > 0
    }
    online = itme ? itme : online


    return (
        <TouchableOpacity
            style={styles.useritemcontianer}
            onPress={()=>onPress(item.userName)}
        >
            <View style={styles.namecontianer}>
                <Text style={styles.username}>
                    {item.userName}

                </Text>
                {itme && <Text style={styles.itme}> (me) </Text>}
            </View>


            <View style={online ? styles.online : styles.ofline}>

            </View>
        </TouchableOpacity>
    )
}

const ListHeader = () => (<View style={styles.list_header}><Text style={styles.list_header_text}>Merci de choisir un utilisateur : </Text></View>)

const Body = ({ users,navigation }) => {
    const connecteduser = useSelector(s => s.users)
    const dispatch = useDispatch();

    const socket_ref = useSelector(s => s.socket_ref);
    const onPress = (username) => {
        if (username == socket_ref.current.auth.username) return;
        dispatch({ type: SET_SELECTED_USER, payload: username });
        console.log("***********-/- : ",username)

        navigation.navigate('conversationScreen');
    }
    return (<View style={styles.body}>
        <FlatList
            ListHeaderComponent={ListHeader}
            data={users}
            renderItem={UserItem(connecteduser, socket_ref.current.auth.username, onPress)}
            keyExtractor={item => item.userName}
        />
    </View>
    )
}

const NewMessagesScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let getUsers = async () => {
            let { data } = await fetchAllUser();
            setUsers(data);
            console.log("data", data)
        }
        getUsers();
    }, [])

    return (
        <View style={styles.screen}>
            <Header navigation={navigation} />
            <Body users={users} navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    namecontianer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    itme: {
        fontSize: 12,
        color: INACTIVE_COLOR
    },
    screen: {
        flex: 1,
        backgroundColor: LIGHT_WHITE,
    },
    body: {
    },
    username: {
        fontSize: 18,
        fontWeight: "bold"
    },
    online: {
        height: 10,
        width: 10,
        backgroundColor: "green",
        borderRadius: 30
    },
    ofline: {
        height: 10,
        width: 10,
        backgroundColor: INACTIVE_COLOR,
        borderRadius: 30
    },
    useritemcontianer: {
        backgroundColor: PRIMARY_WHITE,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 0.2,
        marginBottom: 0.5,
        marginTop: 0.5,
        borderBottomColor: INACTIVE_COLOR
    },
    list_header: {
        backgroundColor: PRIMARY_WHITE,
        padding: 7
    },
    list_header_text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default NewMessagesScreen;