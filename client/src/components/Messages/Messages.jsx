import React, { useState, useEffect, useRef } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { Box, Button, Card, CardActionArea, CardHeader, CircularProgress, Dialog, FormControlLabel, Grid, IconButton, InputBase, List, Tooltip, Typography } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { SET_SELECTED_USER, SET_SOCKET_REF, SET_USERS, ADD_USER, REMOVE_USER, UPDATE_MAPED_MESSAGE } from "../../constants/actionstype";
import socket from "./socket"
import Avatar from '@material-ui/core/Avatar';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import useStyle from "./style"
import FLoating from "./FloatingBtn";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import Picker from 'emoji-picker-react';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { useHistory, useLocation } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux"

import Post from '../PostWrapper/Post';
import poststyle from '../PostWrapper/style';
import { PROFILE_KEY, USER_NAME_KEY } from '../../constants';
import { signOut } from '../../actions/auth';
import { fetchPosts, search } from '../../api';
import { fetch_conversations } from '../../actions/messages'
import { add_post, fetch_post } from '../../actions/posts';
import FlatList from 'flatlist-react';
import ConversationItem from '../Conversations/ConversationItem';
import ConversationPanel from '../Conversations/ConversationPanel';
import UserListeDialog from './UserListeDialog';
import { fetchAllUser } from "../../api";


const navigations = [
    {
        nom: "Accueil",
        icon: (current) => <HomeIcon color={current ? "primary" : "inherit"} />,
        action: history => () => history.push('/home'),
        current: false
    },
    {
        nom: "Message",
        icon: (current) => <EmailOutlinedIcon color={current ? "primary" : "inherit"} />,

        action: history => () => history.push('/message'),
        current: true

    },
    {
        nom: "Profil",
        icon: (current) => <PersonOutlineOutlinedIcon color={current ? "primary" : "inherit"} />,

        action: (history, username) => () => history.push('/' + username),
        current: false

    },
];


const DrawerItem = ({ nom, current, action, icon }) => {
    let style = useStyle();
    let history = useHistory();
    const username = localStorage.getItem(USER_NAME_KEY);

    return (
        <div
            key={action}
            onClick={action(history, username)}
            className={current ? style.drawerItemCurrent : style.drawerItem}
        >
            <div className={style.icon}>{icon(current)}</div>
            <Typography variant="h6" className={style.typography}>
                {nom}
            </Typography>
        </div>)
}


const DrawerNavigation = ({ classes, user, toogleOpenDialog }) => {
    const dispatch = useDispatch();
    const classes2 = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const logout = () => {
        dispatch(signOut())
        setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const history = useHistory();

    const goToMyProfile = () => {
        let param = user ? user?.id ? user.id : user.sub : null
        if (param) {
            history.push('/' + param)
        }
    }
    return (<Grid item lg={4} className={classes.drawerContainer}>
        <div className={classes.drawerRoot}>
            <div className={classes.logoPrincipale}>
                ⵣ
            </div>
            {navigations.map((item) => (<DrawerItem key={item.action} {...item} />))}
            <Button
                variant="contained"
                color="primary"
                className={classes.twistter}
                onClick={toogleOpenDialog}
            >
                Twitter
            </Button>
            <div className={classes.bottomProfil}
                onClick={handleToggle}>
                <Avatar
                    alt="Cindy Baker"
                    src="https://picsum.photos/200/300"
                    className={classes.large} />
                <div className={classes.bottomProfilText} >
                    <Typography variant="body1">
                        {user ? user?.id ? user.id : user.sub : null}
                    </Typography>

                    <Typography variant="body2" className={classes.secodaryText}>
                        {user ? user.name : null}
                    </Typography>
                </div>
                <div>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        style={{ position: 'absolute', bottom: "100%", right: "10%" }}

                    >

                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={goToMyProfile}>Profile</MenuItem>
                                            <MenuItem onClick={logout}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>

            </div>

        </div>
    </Grid>)
}

const NewPost = ({ row = 1 }) => {
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ contenu: '' })
    let classes = useStyle();
    let imageSelector = useRef();
    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject);
    };
    const handleTextChange = (e) => setPostData(old => ({ ...old, contenu: e.target.value }))
    const twesster = () => {
        dispatch(add_post(postData))
    }
    const onChooseImage = () => {
        document.getElementById('filebase').firstChild.click()
    }
    return (<div className={classes.NewPostContainer}>
        <Avatar
            alt="Cindy Baker"
            src="https://picsum.photos/200/300"
            className={classes.large} />
        <div className={classes.NewPostContainerBody}>
            <InputBase
                multiline
                value={postData.contenu}
                onChange={handleTextChange}
                rows={row}
                className={classes.TextField}
                placeholder="Quoi de neuf ? "
                inputProps={{ 'aria-label': 'naked' }}
            />
            <div className={classes.NewPostContainerAction}>
                <div className={classes.NewPostContainerAction2} >
                    <div id="filebase" style={{ display: 'none', }}>
                        <FileBase64
                            type="file"
                            ref={imageSelector}
                            multipe={false}
                            onDone={({ base64 }) => {
                                console.log(base64.length)
                                setPostData({ ...postData, imageAssocier: base64 })
                            }}
                        />
                    </div>
                    <div>
                        <IconButton
                            onClick={onChooseImage}
                            aria-label="selecte image">
                            <ImageOutlinedIcon color="primary" />
                        </IconButton>
                    </div>

                    <Tooltip title={<Picker onEmojiClick={onEmojiClick} />} c interactive>
                        <div>
                            <IconButton
                                aria-label="delete">
                                <SentimentSatisfiedOutlinedIcon color="primary" />
                            </IconButton>
                        </div>
                    </Tooltip>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={twesster}
                    className={classes.send}
                >
                    Twitter
            </Button>


            </div>
        </div>
    </div>)
}

const Header = () => {
    let style = useStyle();
    return (<div className={style.header}>
        <Typography variant="h6" className={style.header_text}>
            Messages
        </Typography>
    </div>)
}

const Twesster = ({ open, toogleOpenDialog }) => {

    return (<Dialog
        open={open}
        onClose={toogleOpenDialog}
    >
        <NewPost row={4} />
    </Dialog>)
}

const Body = ({ conversations, username, onPress }) => {

    return (
        <FlatList
            list={conversations}
            renderItem={ConversationItem(username, onPress)}
        />


    )
}


const Messages = () => {
    const location = useLocation();
    const [showPanel, setPanelVisibilite] = useState(false)
    const postclasses = poststyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(sate => sate.auth)
    const posts = useSelector(state => state.posts)
    const [currentUser, setCurrentUser] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const toogleOpenDialog = () => setOpenDialog(old => !old);

    const classes = useStyle();

    const socket_ref = useRef();
    const username_ref = useRef();
    const conversations = useSelector(state => state.conversations);
    const [have_new_message, set_have_new_message] = useState(false);
    // const onPress = () => navigation.navigate('newmessageScreen')
    const navigate_to_conversation = username => {
        dispatch({ type: SET_SELECTED_USER, payload: username });
        //  navigation.navigate('conversationScreen');
        console.log(username)
    }



    const [listeUserOpned, setListeUserOpned] = useState(false);
    const closeUserListe = () => setListeUserOpned(false);
    const [userList, setUserList] = useState([]);
    const [loading, setIsLoading] = useState(false)
    const openUserList = () => {
        setListeUserOpned(true);
        setIsLoading(true);

        fetchAllUser()
            .then(({ data }) => {
                setUserList(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            })
    }
    const onUserPress = (id) => {
        closeUserListe();
        dispatch({ type: SET_SELECTED_USER, payload: id });

    }
    const usersOnline = useSelector(state => state.users)


    useEffect(() => {
        socket_ref.current = socket;
    }, []);
    useEffect(() => {
        const get_id = async () => {
            let userName = localStorage.getItem(USER_NAME_KEY);
            if (userName) {
                username_ref.current = userName;
                socket_ref.current.auth = { username: username_ref.current };
                socket_ref.current.connect();
                console.log('socket normalement connecter', userName)
                socket_ref.current.on('private message', (message) => set_have_new_message(old => !old))
                socket_ref.current.on('users', users => dispatch({ type: SET_USERS, payload: users }));
                socket_ref.current.on('user connected', user => dispatch({ type: ADD_USER, payload: user }));
                socket_ref.current.on('disconnected', user => dispatch({ type: REMOVE_USER, payload: user }))
                dispatch({ type: SET_SOCKET_REF, payload: socket_ref })
            }
        }
        get_id();
    }, []);

    useEffect(() => {
        dispatch({ type: UPDATE_MAPED_MESSAGE, payload: { messsages: conversations, username: username_ref.current } })
    }, [conversations])

    useEffect(() => {
        dispatch(fetch_conversations())
    }, [have_new_message]);


    const onUserItemClicked = (username) => {
        dispatch({ type: SET_SELECTED_USER, payload: username });
        console.log(username)
    }

    useEffect(() => {
        let profile = localStorage.getItem(PROFILE_KEY)
        if (!profile) {
            history.push('/')
        } else {
            let user = JSON.parse(profile);
            let currentUser = jwtDecode(user?.token);

            let userId = jwtDecode(user?.token).sub || jwtDecode(user?.token).id
            if (!userId) {
                history.push('/')
                return;
            }
            setCurrentUser(currentUser)

            dispatch(fetch_post({ ...posts, posts: undefined }))
        }
    }, [location, auth])



    return (
        <>
            <Grid container spacing={0}
            >
                <DrawerNavigation
                    classes={classes}
                    user={currentUser}
                    toogleOpenDialog={toogleOpenDialog}
                />


                <Grid item lg={3} sm={2} className={classes.accueilRoot}>
                    <Header />
                    <FLoating
                        classes={classes}
                        openListeUser={openUserList}
                    />

                    < FlatList
                        list={conversations}
                        renderItem={ItemOfConversation(username_ref.current, classes, onUserItemClicked)}
                    />
                </Grid>


                <Grid
                    item
                    lg={5}
                    sm={8} style={{ boxSizing: "border-box" }}>
                    <ConversationPanel socketRef={socket_ref} />
                </Grid>
            </Grid >
            <Twesster open={openDialog} toogleOpenDialog={toogleOpenDialog} />
            <UserListeDialog
                open={listeUserOpned}
                openDialog={openDialog}
                onClose={closeUserListe}
                onlineUsers={usersOnline}
                loading={loading}
                userListe={userList}
                classes={classes}
                onPress={onUserPress} />
        </>
    )
}

const ItemOfConversation = (userame, classes, onClick) => (item) => {
    let auterUser = item.users.filter(i => i !== userame)[0]

    let taille = item.messages.length;
    let last_message = item.messages[taille - 1];

    function get_last_message(messages) {
        return JSON.stringify(last_message.data)
    }
    return (<Card
        onClick={() => onClick(auterUser)}
    >
        <CardActionArea>
            <CardHeader
                avatar={
                    <Avatar
                        className={classes.avatar}>
                        {auterUser ? auterUser.split('')[0] : null}
                    </Avatar>
                }

                title={auterUser}

                subheader={get_last_message(item.messages)}
            />
        </CardActionArea>
    </Card>)
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default Messages;