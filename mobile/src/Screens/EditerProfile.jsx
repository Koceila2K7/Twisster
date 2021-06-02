import React, { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather"
import { INACTIVE_COLOR, INACTIVE_COLOR2, PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Avatar } from "react-native-paper";
const CHAMPS = [
    { nom: "Nom", nbLignes: 1 },
    { nom: "Biographie", nbLignes: 4 },
    { nom: "Localisation", nbLignes: 2 },
    { nom: "Site Web", nbLignes: 1 },
    { nom: "Date de naissance", nbLignes: 1 }];


const Header = ({ goBack }) => {
    return (
        <View style={styles.head_contianer}>
            <View style={styles.head_first_child}>
                <TouchableOpacity onPress={goBack}>
                    <Icon name="arrow-left" size={25} color={PRIMARY_COLOR} style={styles.arrow_left} />
                </TouchableOpacity>
                <Text style={styles.head_screen_titel}>Éditer le profil</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.btn_save_txt}>Enregistrer</Text>
            </TouchableOpacity>
        </View>
    )
}
const CoverPicture = () => (
    <View style={styles.cover_picture_container}>
        <Image
            style={styles.banniere}
            source={{
                uri: 'https://picsum.photos/600',
            }}
        />
        <MaterialIcons style={styles.chagne_picture} name="add-a-photo" color={INACTIVE_COLOR2} size={30} />
    </View>
)

const Champ = ({ nom, onPress, nbLignes = 0, index, howAreFocused, onFocus }) => {
    const getStyle = () => [styles.champ_text_input,
    (howAreFocused == index) ? styles.champ_text_input_actif : styles.champ_text_input_inactif]

    return (
        <View style={styles.champ}>
            <Text style={styles.champ_label}>{nom}</Text>

            <TextInput
                numberOfLines={nbLignes}
                multiline={nbLignes > 0}
                style={getStyle()}
                onFocus={() => onFocus(index)}
            />
        </View>
    )
}


const ProfileAvatar = () => (<View style={styles.profile_picture}>
    <Avatar.Image source={{
        uri: 'https://picsum.photos/800',
    }} size={80} />
    <MaterialIcons style={styles.chagne_picture_profile} name="add-a-photo" color={INACTIVE_COLOR2} size={30} />
</View>)


const Main = () => {
    const onPress = (nom) => { console.log(nom) }
    const [howAreFocused, setHowAreFocused] = useState(0)
    const onFocus = index => setHowAreFocused(index)
    return (<View style={styles.main} >
        <ProfileAvatar />
        {
            CHAMPS.map((n, i) => <Champ key={n.nom} onPress={onPress}  {...n} index={i} howAreFocused={howAreFocused} onFocus={onFocus} />)
        }
    </View>)
}
const Body = () => (
    <ScrollView>
        <CoverPicture />
        <Main />
    </ScrollView>)

const EditerProfil = ({ navigation }) => {
    const goBack = () => navigation.goBack()
    return (
        <View style={styles.ful_screen_style}>
            <Header goBack={goBack} />
            <Body />
        </View>
    )
}

const styles = StyleSheet.create({
    ful_screen_style: {
        backgroundColor: PRIMARY_WHITE,
        flex: 1
    },
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
        width: "100%",
        shadowColor: INACTIVE_COLOR,
        elevation: 0.8
    },
    cover_picture_container: {
        top: 50,
        position: "relative"
    },
    chagne_picture_profile: {
        position: "absolute",
        top: "32%",
        right: "35%"
    },
    chagne_picture: {
        position: "absolute",
        top: "42%",
        right: "45%"
    },
    banniere: {
        width: "100%",
        height: 100,
    },
    head_screen_titel: {
        fontWeight: "bold",
        fontSize: 20
    },
    head_first_child: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"

    },
    btn_save_txt: {
        color: PRIMARY_COLOR,
        fontSize: 14

    },
    arrow_left: {
        marginRight: 10
    },
    main: {
        padding: 10,
    },
    profile_picture: {
        left: 5,
        width: 85,
        borderColor: PRIMARY_WHITE,
        borderRadius: 50,
        borderWidth: 3
    },
    champ: { marginBottom: 5, marginTop: 5 },
    champ_label: {
        fontSize: 16,
        color: INACTIVE_COLOR2
    },
    champ_text_input: {
        padding: 5,
    },
    champ_text_input_actif: {
        borderColor: PRIMARY_COLOR,
        borderBottomWidth: 2
    },
    champ_text_input_inactif: {
        borderColor: INACTIVE_COLOR2,
        borderBottomWidth: 0.8
    }
});

export default EditerProfil;