import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR, ACCENT_COLOR, SECOND_COLOR } from '../Styles/Colors';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const SplashScreen = ({ navigation }) => {

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>

            </View>
            <View style={Styles.footer}>
                <Text style={[Styles.title]}>Bienvenue dans Twisster </Text>
                <Text style={Styles.text}>Creer votre propre compte pour profiter de notre réseau social</Text>
                <Animatable.View
                    style={Styles.button}
                    animation="fadeInUpBig"
                    duration={1500}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('SingInScreen')}>
                        <LinearGradient
                            colors={[PRIMARY_COLOR, SECOND_COLOR]}
                            style={Styles.singIn}
                        >
                            <Text style={Styles.textSign}>Commencer</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    );
};




const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    },
    baniere: {
        flex: 1,
        transform: [{ translateY: -105 }],
        position: 'absolute',

    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: "#05375a",
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: ACCENT_COLOR,
        marginTop: 5
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30
    },
    singIn: {
        width: 150,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: (40 * 0.5),
        flexDirection: "row"
    },
    textSign: {
        color: "#FFF",
        fontWeight: "bold"
    }
});