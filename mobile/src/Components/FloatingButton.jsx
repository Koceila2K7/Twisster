import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { INACTIVE_COLOR, PRIMARY_COLOR, PRIMARY_WHITE } from '../Styles/Colors'

const FloatingButton = ({ addPostHandel }) => {
    return (
        <TouchableOpacity style={styles.fab}
            onPress={addPostHandel}
        >
            <Icon name="plus" color={PRIMARY_WHITE} size={12} style={styles.flotingIcon} />
            <Icon name="feather" color={PRIMARY_WHITE} size={30} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
        elevation: 7,
        shadowColor: "black",
        position: 'absolute',
        backgroundColor: PRIMARY_COLOR,
        margin: 16,
        padding: 10,
        right: 0,
        bottom: 0,
        borderRadius: 30
    },
    flotingIcon: {
        position: "absolute",
        top: 15,
        left: 10

    }
})

export default FloatingButton;