import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { INACTIVE_COLOR, INACTIVE_COLOR2, LIGHT_WHITE, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";
import { Avatar, ProgressBar } from "react-native-paper"
import PostItem from '../Components/PostWrapper'
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from 'react-native';
import { getProfil } from "../api/index"
import { ME, SET_PROFILE_TO_SHOW } from "../constants/actionstype";
import { deltePost } from "../api/index"
const Header = ({ goBack }) => (
    <View style={styles.header_container}>
        <Icon name="arrow-left" color={PRIMARY_COLOR} size={25} onPress={goBack} />
        <Icon name="more-vertical" size={25} color={PRIMARY_COLOR} />
    </View>
)

const ProfileInfo = ({ goToEdit, goToFollowerScreen, goToFollowingScreen, profile }) => {

    return (
        <View>
            <View style={{ width: "100%", height: 50 }}></View>
            <View style={styles.profile_info_contianer}>
                <View
                    style={styles.logo}
                ><Avatar.Image source={{
                    uri: 'https://picsum.photos/700',
                }} size={70} />
                </View>
                <View style={styles.prfile_info_top_row}>

                    <TouchableOpacity
                        onPress={goToEdit}
                        style={styles.edite_btn}>
                        <Text style={styles.edite_btn_text}>
                            Editer le profil
                 </Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>{profile.userName}</Text>
                    <Text style={styles.secondairy_text}>{profile.firstName ? "@" + profile.firstName + "" + profile.lastName : ""}</Text>
                </View>
                <View style={styles.register_date}>
                    <Text style={styles.secondairy_text}>{profile.bio}</Text>
                </View>
                <View style={styles.fllowing_info}>
                    <TouchableOpacity style={styles.following_details} onPress={goToFollowingScreen}>
                        <Text style={[styles.secondairy_text, styles.following_number]}> {profile.abonnements.length}</Text>
                        <Text style={styles.secondairy_text}>Abonnement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.following_details} onPress={goToFollowerScreen}>
                        <Text style={[styles.following_number, styles.secondairy_text]}>{profile.abonnes.length}</Text>
                        <Text style={styles.secondairy_text}>Abonnés</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const Banniere = () => (<View>
    <Image
        style={styles.banniere}
        source={{
            uri: 'https://picsum.photos/900',
        }}
    />
</View>)

const Profile = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const [loading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null)
    const goToEdit = () => navigation.navigate("EditerSreen")
    const goToFollowerScreen = () => navigation.navigate("FollowersScreen")
    const goToFollowingScreen = () => navigation.navigate("FollowersScreen")
    const profile_to_show = useSelector(state => state.profile_to_show);
    const [reload, setReload] = useState(false)
    const itme = profile_to_show == ME
    const dispatch = useDispatch();
    const userAvatarCliqued = (profile) => {
        dispatch({ type: SET_PROFILE_TO_SHOW, payload: profile })
    }
    useEffect(() => {
        let getProfile = async () => {
            let id = (profile_to_show === ME) ? '' : profile_to_show;
            setIsLoading(true);
            getProfil(id)
                .then(({ data }) => {
                    setProfile(data);
                    setIsLoading(false);

                })
                .catch(e => {
                    console.warn(e);
                    setIsLoading(false);

                })
        }
        getProfile();
    }, [profile_to_show, reload])


    const deletePost = (_id) => {
        setIsLoading(true);
        deltePost(_id)
            .then(({ data }) => {
                setIsLoading(false);
                dispatch({ type: 'DELETE_POST', payload: _id });
                setReload(o => !o);
            })
            .catch(e => { setIsLoading(false); console.warn(e) })

    }

    return (
        <SafeAreaView style={{ backgroundColor: LIGHT_WHITE }}>
            <Banniere />
            <Header goBack={goBack} />
            {!loading ?
                <FlatList
                    style={styles.body_container}
                    ListHeaderComponent={
                        <ProfileInfo
                            profile={profile}
                            goToEdit={goToEdit}
                            goToFollowerScreen={goToFollowerScreen}
                            goToFollowingScreen={goToFollowingScreen} />}
                    data={profile.posts}
                    renderItem={PostItem(itme,
                        () => console.log("liked"),
                        () => console.log("commenter"),
                        deletePost,
                        userAvatarCliqued)}
                    keyExtractor={item => item}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                    }}
                />

                : <ActivityIndicator
                    color={PRIMARY_COLOR}
                    size={50}
                    style={{
                        position: 'absolute',
                        top: Dimensions.get('window').height / 2 - 25,
                        left: Dimensions.get('window').width / 2 - 25
                    }} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        height: 50
    },
    secondairy_text: {
        color: INACTIVE_COLOR2
    },
    banniere: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 100,
    },
    profile_info_contianer: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: 10,
        backgroundColor: PRIMARY_WHITE,
        justifyContent: "space-around",

    },
    prfile_info_top_row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%"
    },
    edite_btn: {
        padding: 5,
        borderRadius: 30,
        borderColor: INACTIVE_COLOR2,
        borderWidth: 0.5,
    },
    edite_btn_text: {
        color: INACTIVE_COLOR2,
    },
    logo: {
        position: "absolute",
        top: -35,
        left: 5,
        borderColor: PRIMARY_WHITE,
        borderRadius: 50,
        borderWidth: 3
    },
    fllowing_info: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },
    register_date: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 17

    },
    following_number: {
        fontWeight: "bold",
        marginRight: 5
    },
    following_details: {
        display: "flex",
        flexDirection: "row",
        marginRight: 10
    },
    body_container: {
        marginBottom: 60,
    }
})

export default Profile;
