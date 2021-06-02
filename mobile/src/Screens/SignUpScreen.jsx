import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { PRIMARY_COLOR, SECOND_COLOR } from '../Styles/Colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux";
import { signUp } from "../actions/auth";
export const SignUpScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        email: '',
        password: '',
        firstName: "",
        lastName: "",
        check_textInputchange: false,
        confirmePassword: '',
        userName: '',
        confirme_secureTextEntry: true,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        setData({ ...data, email: val, check_textInputchange: (val.length != 0) })
    }
    const userNameChanged = (val) => {
        setData({ ...data, userName: val })
    }
    const lastNameChanged = val => setData({ ...data, lastName: val })
    const fisrtNameChanged = val => setData({ ...data, firstName: val })

    const passwordChanged = (val) => (setData({ ...data, password: val }));

    const secureTextEntryChanged = () => (setData({ ...data, secureTextEntry: !data.secureTextEntry }))

    const confirme_secureTextEntryChanged = () => (setData({ ...data, confirme_secureTextEntry: !data.confirme_secureTextEntry }));

    const confirmePasswordChanged = (val) => (setData({ ...data, confirmePassword: val }))
    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.text_header}>Register Now</Text>
            </View>

            <Animatable.View
                style={Styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={Styles.text_footer}>Email</Text>
                <View style={Styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder="Your Email :"
                        style={Styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {(data.check_textInputchange) ?
                        <Animatable.View
                            animation="bounceIn"

                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : null}
                </View>
                <Text style={Styles.text_footer}>UserName</Text>
                <View style={Styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder="Your UserName :"
                        style={Styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => userNameChanged(val)}
                    />
                    {(data.check_textInputchange) ?
                        <Animatable.View
                            animation="bounceIn"

                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : null}
                </View>
                <Text style={Styles.text_footer}>First Name</Text>
                <View style={Styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder="Your UserName :"
                        style={Styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => fisrtNameChanged(val)}
                    />
                    {(data.check_textInputchange) ?
                        <Animatable.View
                            animation="bounceIn"

                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : null}
                </View>
                <Text style={Styles.text_footer}>Last Name</Text>
                <View style={Styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder="Your UserName :"
                        style={Styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => lastNameChanged(val)}
                    />
                    {(data.check_textInputchange) ?
                        <Animatable.View
                            animation="bounceIn"

                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View> : null}
                </View>

                <Text style={[Styles.text_footer, { marginTop: 10 }]}>Password</Text>
                <View style={Styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20} />
                    <TextInput
                        placeholder="Your Password :"
                        style={Styles.textInput}
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
                                color="gray"
                                size={20}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>

                <View style={Styles.button}>
                    <TouchableOpacity
                        style={Styles.signIn}
                        onPress={() => {
                            console.log(data)
                            dispatch(signUp({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                userName: data.userName,
                                password: data.password
                            }))
                        }
                        }

                    >
                        <LinearGradient
                            colors={[PRIMARY_COLOR, SECOND_COLOR]}
                            style={Styles.signIn}
                        >
                            <Text style={Styles.textSign}>Sing Up</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[Styles.signIn, {
                            borderColor: PRIMARY_COLOR,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[Styles.textSign, { color: PRIMARY_COLOR }]}>Sign In</Text>
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: "#05375a"
    },
    button: {
        alignItems: "center",
        marginTop: 20
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
        flex: 0.6,
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
    registreMsg: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000"
    },
});