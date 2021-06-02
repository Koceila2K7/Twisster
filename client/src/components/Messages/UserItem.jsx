import { CardActionArea, Typography } from '@material-ui/core';
import React from 'react'
import { USER_NAME_KEY } from '../../constants';
const myUserName = localStorage.getItem(USER_NAME_KEY);

const UserItem = ({ classes, onlineUsers, onPress, username }) => {
    let itsMe = myUserName === username;
    let isOnline = onlineUsers.get(username) ? onlineUsers.get(username).length > 0 : false;
    const onClick = () => onPress(username);
    return (
        <div className={classes.UserItemContainer} onClick={onClick}>
            <CardActionArea className={classes.CardActionArea}>
                <div className={classes.CardActionAreaContainer}>
                    <Typography variant='h6' className={classes.usernameTitle} >
                        {username}
                        {itsMe ? " ( me )" : null}
                    </Typography>
                    <div className={isOnline ? classes.online : classes.notoline}>

                    </div>
                </div>
            </CardActionArea>
        </div>
    )
}

export default UserItem;
