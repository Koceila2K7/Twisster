import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, CardActionArea, CardHeader, CircularProgress, Dialog, FormControlLabel, Grid, Icon, IconButton, InputBase, List, Tooltip, Typography, withStyles } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import Avatar from '@material-ui/core/Avatar';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import useStyle from "./style"
import Picker from 'emoji-picker-react';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { Link, useHistory, useLocation } from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux"
import Post from '../PostWrapper/Post';
import poststyle from '../PostWrapper/style';
import { PROFILE_KEY, USER_NAME_KEY } from '../../constants';
import { search } from '../../api';
import { add_post, fetch_post } from '../../actions/posts';
import FlatList from 'flatlist-react';
import ClearIcon from '@material-ui/icons/Clear';
import IOSSwitch from '../IOSSwitch';
import navigations from "./nav"
import DrawerNavigation from '../DrawerNavigation/DrawerMenu';
import RightBar from '../SearchBar/SearchBar';
const NewPost = ({ row = 1 }) => {
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ contenu: '' })
    let classes = useStyle();
    let imageSelector = useRef();
    const onEmojiClick = (event, emojiObject) => {
        setPostData(old => ({ ...old, contenu: old.contenu + emojiObject.emoji }));

    };
    const handleTextChange = (e) => setPostData(old => ({ ...old, contenu: e.target.value }))
    const twesster = () => {
        dispatch(add_post(postData))
        clearPost()
    }
    const clearPost = () => {
        setPostData({ contenu: '' })
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
            <IconButton
                onClick={clearPost}
                className={classes.clearPost}
            >
                <ClearIcon color="secondary" />
            </IconButton>
            {postData.imageAssocier ?
                <img
                    className={classes.imageSelectionner}
                    src={postData.imageAssocier}
                /> : null}
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

                    <Tooltip title={<Picker onEmojiClick={onEmojiClick} />} interactive>
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
            Accueil
        </Typography>
    </div>)
}

const Twesster = ({ open, toogleOpenDialog }) => {
    const row = 4
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({ contenu: '' })
    let classes = useStyle();
    let imageSelector = useRef();
    const onEmojiClick = (event, emojiObject) => {
        setPostData(old => ({ ...old, contenu: old.contenu + emojiObject.emoji }));

    };
    const handleTextChange = (e) => setPostData(old => ({ ...old, contenu: e.target.value }))
    const twesster = () => {
        dispatch(add_post(postData))
        clearPost()
    }
    const clearPost = () => {
        setPostData({ contenu: '' })
    }
    const onChooseImage = () => {
        document.getElementById('filebase1').firstChild.click()
    }
    return (<Dialog
        open={open}
        onClose={toogleOpenDialog}
    >
        <div className={classes.NewPostContainer}>
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
                <IconButton
                    onClick={clearPost}
                    style={{ position: "absolute", top: 0, right: 0 }}
                >
                    <ClearIcon color="secondary" />
                </IconButton>
                {postData.imageAssocier ?
                    <img
                        className={classes.imageSelectionner}
                        src={postData.imageAssocier}
                    /> : null}
                <div className={classes.NewPostContainerAction}>
                    <div className={classes.NewPostContainerAction2} >
                        <div id="filebase1" style={{ display: 'none', }}>
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
        </div>
    </Dialog>)
}

const Home = () => {
    const idPanel = "panel"
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
    const classes = useStyle();
    useEffect(() => {
        document.addEventListener('click', e => {
            let element = document.getElementById(idPanel)
            if (element === null) return
            else {

                let bound = element.getBoundingClientRect();
                if (e.clientX < bound.x ||
                    e.clientX > (bound.x + bound.width) ||
                    e.clientY < bound.y ||
                    e.clientY > bound.y + bound.height

                ) {
                    setPanelVisibilite(false)


                } else {
                    setPanelVisibilite(true)

                }
            }
        })
    }, [])
    const verifyClick = e => {





    }
    return (
        <>
            <Grid container spacing={0}
                onClick={verifyClick}
            >
                <DrawerNavigation
                    navigations={navigations}
                    classes={classes}
                    user={currentUser}
                    toogleOpenDialog={toogleOpenDialog}
                />


                <Grid item lg={4} sm={10} xs={10} className={classes.accueilRoot}>
                    <Header />
                    <NewPost row={8} />
                    {posts.posts.length != 0 ?
                        < FlatList
                            list={posts.posts}
                            renderItem={Post(postclasses)}
                            sort={{
                                by: ["posteLe", { key: "posteLe", descending: false }],
                                descending: true,
                                caseInsensitive: true
                            }}
                        />
                        : <CircularProgress color="primary" style={{ position: "absolute", top: "50vh", left: "30vh" }} />
                    }

                </Grid>
                <RightBar showPanel={showPanel} setPanelVisibilite={setPanelVisibilite} id={idPanel} />
            </Grid >
            <Twesster open={openDialog} toogleOpenDialog={toogleOpenDialog} />
        </>
    )
}

export default Home;