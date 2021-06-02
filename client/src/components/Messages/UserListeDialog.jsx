import React from 'react'
import { CircularProgress, Dialog, Typography } from "@material-ui/core";
import UserItem from "./UserItem";
import FlatList from 'flatlist-react';

const UserItemWrapper = (classes, onlineUsers, onPress) =>
    ({ userName }) =>
        <UserItem
            username={userName}
            onPress={onPress}
            classes={classes}
            onlineUsers={onlineUsers} />

const UserListeDialog = ({ open, onClose, userListe, onlineUsers, classes, onPress, loading }) => {


    return (
        <Dialog
            onClose={onClose}
            open={open}
            style={{ padding: 10 }}
        >
            <div className={classes.logoPrincipale}>
                ⵣ
            </div>
            <Typography variant="h5"
                className={classes.header_title}
            >
                Merci de choisir un utilisateur :
            </Typography>
            {loading ?
                (<CircularProgress open={loading} style={{ margin: "auto" }} />)
                : (< FlatList
                    list={userListe}
                    renderItem={UserItemWrapper(classes, onlineUsers, onPress)}
                />)}
        </Dialog>
    )
}

export default UserListeDialog;
