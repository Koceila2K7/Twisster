import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {
    INACTIVE_COLOR,
    PRIMARY_WHITE,
    PRIMARY_COLOR,
    INACTIVE_COLOR2
} from '../Styles/Colors';

import Icon from "react-native-vector-icons/Feather";
import { Avatar } from 'react-native-paper';

const FAKE_FOLLOWRS = [
    {
        id: "0",
        image: { uri: 'https://picsum.photos/700' },
        nom: "LE WOOP",
        userName: "@LeWoopGang",
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore facere blanditiis consequatur vitae error perferendis voluptate veniam exercitationem in eveniet corporis qui tenetur non laudantium, quas tempora nesciunt quos incidunt!"
    },
    {
        id: "1",
        image: { uri: 'https://picsum.photos/700' },
        nom: "Cyprien",
        userName: "@MonsieurDream",
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore facere blanditiis consequatur vitae error perferendis voluptate veniam exercitationem in eveniet corporis qui tenetur non laudantium, quas tempora nesciunt quos incidunt!"
    }
]

const MiniPorfile = ({ item }) => {
    return (
        <TouchableOpacity style={styles.mini_profile_container}>
            <View style={styles.mini_profile_picture}>
                <Avatar.Image source={{
                    uri: 'https://picsum.photos/700',
                }} size={62} />
            </View>
            <View style={styles.mini_profile_text}>
                <View style={styles.first_line}>
                    <View>
                        <Text style={styles.nom}>{item.nom}</Text>
                        <Text style={styles.usernam}>{item.userName}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btn_text}>
                            Abonnements
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.mini_profile_bio}><Text>{item.bio}</Text></View>
            </View>
        </TouchableOpacity>
    )
}

const Header = ({ goBack }) => {
    return (
        <View style={styles.head_contianer}>
            <View style={styles.head_first_child}>
                <TouchableOpacity onPress={goBack}>
                    <Icon name="arrow-left"
                        size={25}
                        color={PRIMARY_COLOR}
                        style={styles.arrow_left} />
                </TouchableOpacity>
                <Text style={styles.head_screen_titel}>Abonnements</Text>
            </View>
        </View>
    )
}

const FollowersScreen = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    return (
        <View style={styles.fullScreen}>
            <Header goBack={goBack} />
            <FlatList
                style={styles.profile_liste}
                data={FAKE_FOLLOWRS}
                renderItem={MiniPorfile}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mini_profile_picture: { marginRight: 7 },
    usernam: { color: INACTIVE_COLOR2 },
    nom: { fontWeight: "bold" },
    mini_profile_bio: {
        maxHeight: 50,
        overflow: "hidden",
    },
    mini_profile_text: { flex: 1 },
    btn: {
        backgroundColor: PRIMARY_COLOR,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        height: 30,
        width: 120
    },
    btn_text: { color: PRIMARY_WHITE, fontWeight: "bold" },
    profile_liste: {
        marginTop: 50,
        padding: 5
    },
    fullScreen: {
        backgroundColor: PRIMARY_WHITE,
        flex: 1,
    },
    first_line: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        flex: 1,
        width: "100%"

    },
    mini_profile_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 7,
        flex: 1,
        borderBottomWidth: 0.2,
        borderBottomColor: INACTIVE_COLOR


    },
    head_first_child: {},
    head_contianer: {
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        padding: 10,
        alignItems: "center",
        backgroundColor: PRIMARY_WHITE,
        width: "110%",
        shadowColor: INACTIVE_COLOR,
        elevation: 0.8
    },
    head_screen_titel: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10
    },
    head_first_child: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },
});

export default FollowersScreen