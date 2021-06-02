import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { PRIMARY_WHITE, PRIMARY_COLOR, SECOND_COLOR, INACTIVE_COLOR, INACTIVE_COLOR2 } from "../Styles/Colors";
import { Avatar } from "react-native-paper"
import { createPost } from "../api";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { add_post } from "../actions/posts";
const NewPostHeader = ({ cancel_clicked, post_clicked }) => (
    <View style={styles.header_container}>
        <Icon name="x" color={PRIMARY_COLOR} size={25} onPress={cancel_clicked} />

        <TouchableOpacity style={styles.header_send_btn}
            onPress={post_clicked}
        >
            <Text style={{ color: PRIMARY_WHITE }}>
                Teweester
            </Text>
        </TouchableOpacity>
    </View>
)

const NewPostFooter = ({ PickImage }) => (
    <View style={styles.footer_container}>
        <View style={styles.footer_part}>
            <FontAwesome name="photo" style={styles.icon} size={25} onPress={PickImage} />
            <MaterialIcons name="gif" style={styles.icon} size={25} />
            <SimpleLineIcons name="location-pin" style={styles.icon} size={25} />
        </View>
        <View style={styles.footer_part}>
            <Ionicons name="add-circle" style={styles.icon} size={25} />
        </View>
    </View>
)


const NewPostBody = ({ post, handleTextChange, imageUri }) => (
    <View>
        <View style={styles.body_container}>
            <Avatar.Image
                style={{ margin: 5 }}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' }}
                size={50} />

            <TextInput
                style={styles.body_input}
                placeholder="Quoi de neuf ?"
                value={post.contenu}
                onChangeText={handleTextChange}
                multiline={true}
            />

        </View>
        {imageUri !== '' && < Image
            source={{ uri: imageUri }}
            style={styles.selecte}
            source={{ uri: imageUri }}
            style={styles.selectedImage}
        />}
    </View>
)
const initial_post = { contenu: "" }
const NewPost = ({ navigation }) => {
    const dispatch = useDispatch();
    const [imageUri, setImageUri] = useState('');
    const cancel_clicked = () => navigation.goBack();
    const [newPost, setNewPost] = useState(initial_post);
    useEffect(() => {
        const a = async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert("Permission non accorder");
                }
            }
        }
        a();
    }, []);

    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            setNewPost(oldp => ({ ...oldp, imageAssocier: result.base64 }));

            console.log(result.base64[0])
            setImageUri(result.uri)
        }

    }

    const post_clicked = () => {
        dispatch(add_post(newPost, cancel_clicked))
    }
    const handleTextChange = (txt) => setNewPost(oldp => ({ ...oldp, contenu: txt }));

    return (
        <View style={styles.main}>

            <NewPostHeader cancel_clicked={cancel_clicked} post_clicked={post_clicked} />
           

            <NewPostBody post={newPost} imageUri={imageUri} handleTextChange={handleTextChange} />
            <NewPostFooter PickImage={PickImage} />
        </View>
    )
}


const styles = StyleSheet.create({
    selectedImage: {
        height: "60%",
        width: "80%",
        marginTop: "12%",
        alignSelf: "center",
        borderRadius: 8,
        shadowColor: INACTIVE_COLOR2
    },
    main: {
        backgroundColor: PRIMARY_WHITE,
        flex: 1
    },
    header_container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    header_send_btn: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20,
        padding: 10
    },
    footer_part: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    footer_container: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        padding: 10,
        borderTopColor: INACTIVE_COLOR,
        borderTopWidth: 0.2

    },
    icon: {
        color: PRIMARY_COLOR,
        margin: 5
    },
    body_container: {
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    body_input: {
        flex: 1,
        height: "100%",
        width: "100%",
        margin: 5
    }

})

export default NewPost;