import { CardActionArea, IconButton, InputBase, TextField, Typography } from '@material-ui/core';
import FlatList from 'flatlist-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useStyle from "./style"
import SendIcon from '@material-ui/icons/Send';
import ScrollToBottom from 'react-scroll-to-bottom';

const Header = ({ username, users }) => {
    let online = false;
    let styles = useStyle();
    if (users.get(username)) {
        online = users.get(username).length > 0;
    }
    return (<div className={styles.header}>
        <Typography variant="h6" className={styles.header_text}>{username}</Typography>
        {username && <div className={online ? styles.onLine : styles.offline}>
        </div>}
    </div>)
}


const EditText = ({ onChangeText, value, send, styles, username }) => {

    return username ? (<div className={styles.EditText}>
        <InputBase
            variant="outlined"
            className={styles.TextInput}
            placeholder={"Tapez votre message ...."}
            value={value}
            onChange={onChangeText}
        />
        <IconButton
            color="primary"
            className={styles.btn_send}
            onClick={send}
        >
            <SendIcon color="primary" />
        </IconButton>
    </div>)
        : null
}

const MessageItem = (username, styles) => (item) => {
    let fromme = (username === item.from)
    let style = fromme ? styles.recevivedmessage : styles.sendedmessage;
    let contianerStye = fromme ? styles.messages_contianer_received : styles.messages_contianer_sended
    return (<div className={contianerStye}>
        <div className={style}>
            <Typography className={styles.message}>{item.data}</Typography>
        </div>
    </div>)
}

const MessageListe = ({ messages, username }) => {

    let conversation = messages.get(username);
    let styles = useStyle();
    return (conversation) ?
        (<div

            className={styles.body_contianer}

        >
            <ScrollToBottom className={styles.scorllToBottom}>
                <FlatList

                    list={conversation?.messages}
                    renderItem={MessageItem(username, styles)}
                />
            </ScrollToBottom>
        </div>

        )
        : (<div></div>)

}


const ConversationPanel = ({ socketRef }) => {
    const messages = useSelector(state => state.maped_message)
    const username = useSelector(state => state.selected_user);

    const users = useSelector(state => state.users)
    const styles = useStyle();
    const [currentMessage, setCurrentMessage] = useState('');
    const onChangeText = e => setCurrentMessage(e.target.value);
    const send = () => {
        let to = [];
        if (users.get(username)) {
            to = users.get(username)
        }
        let message = {
            from: socketRef.current.auth.username,
            content: currentMessage,
            to_username: username,
            to
        }

        socketRef.current.emit("private message", message)
        setCurrentMessage('');
    }

    return (
        <div style={{
            boxSizing: "border-box",
            position: "relative",
            height: "100%"
        }}>
            <Header username={username} users={users} />
            <MessageListe messages={messages} username={username} />
            <EditText onChangeText={onChangeText} send={send} value={currentMessage} styles={styles} username={username} />
        </div>
    )
}

export default ConversationPanel;