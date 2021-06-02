import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons"
import { INACTIVE_COLOR, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";


const Header = ({ navigation }) => {
    return (
        <View style={Style.mainContianer}>
            <View style={Style.hamburger_icon}>
                <Icon.Button
                    name="ios-menu"
                    size={25}
                    color={PRIMARY_COLOR}
                    backgroundColor={PRIMARY_WHITE}
                    onPress={() => (navigation.openDrawer())} />
            </View>

            <View style={Style.logo}>
                <Text style={{ fontSize: 30, color: PRIMARY_COLOR }}>ⵣ</Text>
            </View>

            <View style={Style.profile_picture}>

            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    mainContianer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: PRIMARY_WHITE,
        alignItems: "center",
        height: 50,
        shadowColor: INACTIVE_COLOR,
        elevation: 0.8

    },
    hamburger_icon: {
        flex: 2
    },
    logo: {
        flex: 6,
        display: "flex",
        alignItems: "center"
    },
    profile_picture: {
        flex: 2
    }
});
export default Header;