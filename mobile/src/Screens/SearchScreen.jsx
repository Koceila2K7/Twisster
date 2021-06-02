import React from "react";
import Icon from "react-native-vector-icons/Feather"
import { StyleSheet, Text, TextInput, View } from "react-native";
import { INACTIVE_COLOR, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";

const Header = ({backUpClicked}) => (
    <View style={styles.header_container}>
        <Icon style={styles.header_icon}
            name="arrow-left"
            color={PRIMARY_COLOR}
            onPress={backUpClicked}
            size={30} />
        <TextInput style={styles.header_input} placeholder="Rechercher sur Twister" />
    </View>
)

const SearchScreen = ({navigation}) => {
    const backUpClicked = ()=>navigation.goBack();
    return (
        <View>
            <Header backUpClicked={backUpClicked}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header_container: {
        backgroundColor: PRIMARY_WHITE,
        display: "flex",
        flexDirection: "row",
        alignContent:"center",
        alignItems:"center",
        justifyContent:"space-between",
        padding: 10,
        height: 50,
        shadowColor: INACTIVE_COLOR,
        elevation: 0.8
    },
    header_icon: {
        flex: 1
    },
    header_input: {
        flex: 9,
        marginLeft: 10
    }

})
export default SearchScreen