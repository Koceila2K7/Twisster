import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { FAB, ActivityIndicator } from 'react-native-paper';
import { PRIMARY_COLOR, PRIMARY_WHITE } from "../Styles/Colors"
import FloatingButton from "../Components/FloatingButton";
import { useDispatch, useSelector } from "react-redux"
import { FlatList } from "react-native-gesture-handler";
import PostItem from '../Components/PostWrapper'
import { SET_PROFILE_TO_SHOW } from "../constants/actionstype";

const Home = ({navigation}) => {
    const addPostClick = () => { navigation.navigate("newPost")}
    const posts = useSelector(state => state.posts.posts);
    const [onLonding, setOnLonding] = useState(false)
    const dispatch = useDispatch();
    const userAvatarCliqued = (profile) => {
        dispatch({ type: SET_PROFILE_TO_SHOW, payload: profile })
        navigation.navigate('Profile')
    }
    return (
        <View style={styles.main_container}>
            {onLonding && <ActivityIndicator
                color={PRIMARY_COLOR}
                hidesWhenStopped
                style={{ backgroundColor: PRIMARY_WHITE }} />}
            <FlatList
                data={posts}
                renderItem={PostItem(false,
                    () => console.log("liked"),
                    () => console.log("commenter"),
                    () => console.log("delted"),
                    userAvatarCliqued)}
                keyExtractor={item => item._id}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    setOnLonding(!onLonding)
                }}
            />
            <FloatingButton addPostHandel={addPostClick} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_container: {
        height: "100%",
        width: "100%"
    }
})
export default Home