import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from "../Styles/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux'
import { signOut as SignOut } from "../actions/auth";
import { PROFILE_KEY } from '../constants';
import { ME, SET_PROFILE_TO_SHOW, TOOGLEFREINDONLY } from '../constants/actionstype';
import { toogle_freind_only } from '../actions/posts';

export function DrawerContent(props) {
    const [profile, setProfile] = useState(null)
    const freindOnly = useSelector(state => state.posts.freindOnly);
    const posts = useSelector(state => state.posts);

    const dispatch = useDispatch();
    const toogleFreindOnly = () => {
        dispatch(toogle_freind_only({ ...posts, posts: undefined }))

    }

    useEffect(() => {
        const getSignInInfo = async () => {
            let profile = await AsyncStorage.getItem(PROFILE_KEY);
            console.log(profile)
            if (profile)
                profile = JSON.parse(profile)
            setProfile(profile)

        }
        getSignInInfo();
    }, []);

    const goToProfile = () => {
        dispatch({ type: SET_PROFILE_TO_SHOW, payload: ME });
        props.navigation.navigate("Profile")
    }

    const signOut = () => dispatch(SignOut());
    const toggleTheme = null;
    const paperTheme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={Styles.drawerContent}>
                    <View style={Styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={
                                    { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' }
                                }
                                size={50}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={Styles.title}>{profile ? profile.result.firstName : null}</Title>
                                <Caption style={Styles.caption}>{profile ? profile.result.lastName : null}</Caption>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <View style={Styles.section}>
                            <Paragraph style={[Styles.paragraph, Styles.caption]}>80</Paragraph>
                            <Caption style={Styles.caption}>Following</Caption>
                        </View>
                        <View style={Styles.section}>
                            <Paragraph style={[Styles.paragraph, Styles.caption]}>150</Paragraph>
                            <Caption style={Styles.caption}>Followers</Caption>
                        </View>
                    </View>
                    <Drawer.Section style={Styles.drawerSection} >
                        <DrawerItem
                            icon={({ color, size }) => <Icon name="home-outline" size={size} color={color} />}
                            label="Home"
                            onPress={() => { props.navigation.navigate("homeScreen") }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => <Icon name="account-outline" size={size} color={color} />}
                            label="Profil"
                            onPress={goToProfile}
                        />

                        <DrawerItem
                            icon={({ color, size }) => <Icon name="email-edit" size={size} color={color} />}
                            label="Messages"
                            onPress={() => { props.navigation.navigate('Message') }}
                        />

                    </Drawer.Section>
                    <Drawer.Section label="Preferences">
                        <TouchableRipple /*onPress={toggleTheme}*/>
                            <View style={Styles.preference}>
                                <Text>Drak Theme </Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={toogleFreindOnly}>
                            <View style={Styles.preference}>
                                <Text>Friends Posts Only </Text>
                                <View pointerEvents="none">
                                    <Switch value={freindOnly} color={PRIMARY_COLOR} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={Styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => <Icon name="exit-to-app" size={size} color={color} />}
                    label="Sign out"
                    onPress={signOut}
                />
            </Drawer.Section>
        </View>)
};


const Styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 15
    },
    section: {
        flexDirection: "row",
        alignContent: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    }

});