import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR, ACCENT_COLOR, SECOND_COLOR } from '../Styles/Colors';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux"
import { signIn } from '../actions/auth';
export const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputchange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    });
    const dispatch = useDispatch();

    const textInputChange = (val) => {
        setData({ ...data, email: val, check_textInputchange: (val.length >= 4), isValidUser: (val.trim().length >= 4) })
    }
    const passwordChanged = (val) => (setData({ ...data, password: val, isValidPassword: (val.trim().length >= 8) }));

    const secureTextEntryChanged = () => (setData({ ...data, secureTextEntry: !data.secureTextEntry }));

    const handelSumbit = () => {
        console.log("click");
        dispatch(signIn({ email: data.email, password: data.password }))
    }
    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />

            <View style={Styles.header}>

            </View>
            <Animatable.View
                style={Styles.footer}
                animation="fadeInUpBig"
            >

                <Text style={Styles.welcomeMsg}>Welcome !</Text>
                <Text style={Styles.underWelcome}>Sign in to continue</Text>
                {/**Champ Email */}
                <Text style={[Styles.text_footer]}>Email</Text>
                <View style={Styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={"#05375a"}
                        size={20} />
                    <TextInput
                        placeholder="Your Email :"
                        style={[Styles.textInput]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}

                    />
                    {(data.check_textInputchange) ?
                        <Animatable.View
                            animation="bounceIn"

                        >
                            <Feather
                                name="check-circle"
                                color={"green"}
                                size={20}
                            />
                        </Animatable.View> : null}
                </View>
                {!data.isValidUser ?
                    (<Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={Styles.errorMsg}>User name must be 4 characters</Text>
                    </Animatable.View>)
                    : null
                }
                {/**Champ Password */}
                <Text style={[Styles.text_footer]} >Password</Text>
                <View style={Styles.action}>
                    <Feather
                        name="lock"
                        color={"#05375a"}
                        size={20} />
                    <TextInput
                        placeholder="Your Password :"
                        style={[Styles.textInput]}
                        secureTextEntry={data.secureTextEntry}
                        autoCapitalize="none"
                        onChangeText={(val) => passwordChanged(val)}

                    />
                    <TouchableOpacity
                        onPress={() => secureTextEntryChanged()}
                    >
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name={(data.secureTextEntry) ? "eye-off" : "eye"}
                                color={"#05375a"}
                                size={20}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                {!data.isValidPassword ?
                    (<Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={Styles.errorMsg}>Password must be 4 characters</Text>
                    </Animatable.View>)
                    : null}

                <View style={Styles.button} >
                    {/**Button sign In  */}
                    <TouchableOpacity
                        style={Styles.signIn}
                        onPress={handelSumbit}
                    >
                        <LinearGradient
                            colors={[PRIMARY_COLOR, SECOND_COLOR]}
                            style={Styles.signIn}
                        >
                            <Text style={Styles.textSign}>Sing In</Text>

                        </LinearGradient>
                    </TouchableOpacity>

                    {/**Button sign Up  */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SingUpScreen')}
                        style={[Styles.signIn, {
                            borderColor: PRIMARY_COLOR,
                            borderWidth: 1,
                            marginTop: 15,

                        }]}
                    >
                        <Text style={[Styles.textSign, { color: PRIMARY_COLOR }]}>Sign Up</Text>
                    </TouchableOpacity>



                </View>

            </Animatable.View>
        </View>
    );
};


const Styles = StyleSheet.create({
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    baniere: {
        flex: 1,
        transform: [{ translateY: -105 }],
        position: 'absolute',

    },
    welcomeMsg: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000"
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a"
    },
    button: {
        alignItems: "center",
        marginTop: 50,

    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },
    text_footer: {
        color: "#05375a",
        fontSize: 18
    },
    errorMsg: {
        color: 'red',
        fontSize: 12
    },
    underWelcome: {
        color: ACCENT_COLOR,
        fontSize: 16,
        marginBottom: 12
    }

});