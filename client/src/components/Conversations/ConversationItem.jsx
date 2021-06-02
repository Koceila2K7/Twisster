import { Avatar, Box, Typography } from '@material-ui/core';
import React from 'react';
import makeStyles from './style';

const ConversationItem = (userame, onPress) => (  item ) => {
    let styles = makeStyles();
    let taille = item.messages.length;
    let last_message = item.messages[taille - 1];

    function get_last_message(messages) {
        return JSON.stringify(last_message.data)
    }
    return (
        <Box style={styles.container}
            onPress={() => onPress(item.users.filter(i => i !== userame)[0])}
        >

            <Avatar
                style={styles.avatar}
                source={{
                    uri: 'https://picsum.photos/700',
                }} size={62} />
            <Box
                style={styles.user_and_message_container}
            >
                <Box
                    style={styles.user_container}
                >
                    <Typography style={styles.username}>
                        {item.users.filter(i => i !== userame)[0]}
                    </Typography>
                    <Typography style={styles.date}>
                        {last_message.date.split('T')[0]}
                    </Typography>
                </Box>

                <Box style={styles.message_conatainer}>
                    <Typography style={styles.last_message}>{get_last_message(item)}</Typography>
                </Box>
            </Box>
        </Box>

    )
}

export default ConversationItem;