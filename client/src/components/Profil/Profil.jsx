import React, { useState, useEffect, useRef } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import poststyle from '../PostWrapper/style';
import PostW from '../PostWrapper/Post';
import { Button, Dialog, Grid, IconButton, InputBase, CircularProgress, Tooltip, Typography, Tabs, Tab, useTheme, Box, LinearProgress, FormControlLabel, Card, CardActionArea, CardHeader } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import SwipeableViews from 'react-swipeable-views';
import Avatar from '@material-ui/core/Avatar';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import useStyle from "./style"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { getProfil, removeFriend, deltePost } from "../../api/index"
import Picker from 'emoji-picker-react';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { Route, Router, Switch, useHistory, useLocation, useParams, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux"
import { PROFILE_KEY, USER_NAME_KEY } from '../../constants';
import { signOut } from '../../actions/auth';
import { add_post } from '../../actions/posts';
import FlatList from "flatlist-react";
import Post from "../Post/Post"
import SearchIcon from '@material-ui/icons/Search';
import { search, sAbonner, seDessabonner } from '../../api';
import EditProfil from "../EditProfil/EditProfil"
import EditProfilUsStyle from "../EditProfil/style"
import DrawerNavigation from '../DrawerNavigation/DrawerMenu';
import navigations from "./nav"

import RightBar from '../SearchBar/SearchBar';
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

const Header = ({ username, numberOfPosts }) => {
    let style = useStyle();
    let history = useHistory();
    let goBack = () => {
        history.goBack();
    }
    return (<div className={style.header}>
        <IconButton
            onClick={goBack}
        >
            <ArrowBackIcon color='primary' className={style.arrowGoBack} />
        </IconButton>
        <div className={style.headerTextContainer}>
            <div>
                <Typography
                    variant="h6" className={style.header_text}>
                    {username}
                </Typography>
            </div>
            <div>
                <Typography
                    variant="body2"
                    className={style.header_text_secondry}>
                    {numberOfPosts + " posts"}
                </Typography>
            </div>
        </div>
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Body = ({ profile, itme, reload, myProfile }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const [showPassword, setShowPassord] = useState(false)
    const history = useHistory();
    const EditProfilCLasses = EditProfilUsStyle()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const [openEdit, setOpenEdit] = useState(false);
    const closeEdit = () => setOpenEdit(false);
    const openEditView = () => setOpenEdit(true);
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const getMot = () => {
        console.log(myProfile);
        if (myProfile) {
            let rst = myProfile.abonnements.filter(i => i.userTo == profile.userName);
            return (rst.length > 0)
        }
        return myProfile

    }
    const addFriend = () => {
        sAbonner(profile.userName)
            .then(() => {
                reload();
            }).catch(e => console.error(e))
    }

    const deleteFriend = () => {
        seDessabonner(profile.userName)
            .then(() => {
                reload();
            }).catch(e => console.error(e))
    }

    let classes = useStyle();
    return (
        <>
            <div className={classes.coverImageContainer}>
                <img src="https://picsum.photos/800/300" />
            </div>
            <div className={classes.avatarContainer}>
                <Avatar aria-label="recipe"
                    className={classes.mainAvatar}>
                    {profile.userName ? profile.userName.split('')[0] : null}
                </Avatar>
                {itme ? <Button
                    variant="outlined"
                    color="primary"
                    onClick={openEditView}
                    className={classes.editBtn}
                >
                    Éditer le profil
                </Button> :
                    getMot() ?
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={deleteFriend}
                            className={classes.editBtn}
                        >
                            se désabonner
                        </Button>
                        : <Button
                            onClick={addFriend}

                            variant="outlined"
                            color="primary"
                            className={classes.editBtn}
                        >
                            s'abonner
                        </Button>
                }
            </div>
            <div className={classes.profileTextContainer}>

                <Typography
                    className={classes.mainTypo}
                    variant="h6"
                >
                    {profile.firstName}
                </Typography>
                <Typography
                    className={classes.secodaryTypo}
                    variant="body1"
                >
                    {profile.userName}
                </Typography>
                {profile.bio && <Typography
                    variant="body2"
                >
                    {profile.bio}
                </Typography>}
                <div
                    onClick={() => history.push('/' + profile.userName + '/amis')}

                    className={classes.freindSectionContainer}>
                    <div
                        className={classes.abonnementInfoContainer}>
                        <Typography className={classes.mainTypo}>
                            {profile.abonnements.length}
                        </Typography>
                        <Typography
                            variant="body2"
                            className={classes.secodaryTypo}
                        >
                            abonnements
                        </Typography>
                    </div>
                    <div className={classes.abonnementInfoContainer}>
                        <Typography className={classes.mainTypo}>
                            {profile.abonnes.length}
                        </Typography>
                        <Typography
                            className={classes.secodaryTypo}
                            variant="body2">
                            abonnes
                        </Typography>
                    </div>
                </div>
            </div>


            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Tweets" {...a11yProps(0)} />
                <Tab label="J'aime" {...a11yProps(1)} />

            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Posts posts={profile.posts} itme={itme} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Posts posts={profile.postLiker} />
                </TabPanel>

            </SwipeableViews>
            <EditProfil
                reload={reload}
                open={openEdit}
                profile={profile}
                classes={EditProfilCLasses}
                setOpen={closeEdit}
                showPassword={showPassword}
                setShowPassord={setShowPassord}
                message={message}
                setMessage={setMessage}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
            />
        </>
    )
}

const BodyWrapper = (profile, itme, reload, myProfile) => <Body profile={profile} itme={itme} reload={reload} myProfile={myProfile} />

const Amis = ({ profile, itme }) => {
    const theme = useTheme();
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (<div>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
        >
            <Tab label="Abonnés" {...a11yProps(0)} />
            <Tab label="Abonné" {...a11yProps(1)} />
        </Tabs>

        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <FlatList
                    list={profile.abonnements}
                    renderItem={userElement(true, itme, history, profile)}
                    sort={{
                        by: ["posteLe", { key: "posteLe", descending: false }],
                        descending: true,
                        caseInsensitive: true
                    }}

                />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <FlatList
                    list={profile.abonnes}
                    renderItem={userElement(false)}
                    sort={{
                        by: ["posteLe", { key: "posteLe", descending: false }],
                        descending: true,
                        caseInsensitive: true
                    }}

                />
            </TabPanel>

        </SwipeableViews>
    </div >)
}

const PostWrapper = (supprimable, deletedCallback) => (props) =>
    <Post {...props} supprimable={supprimable} deletedCallback={deletedCallback} />


const deletePost = (history, params, showLoading) => (id) => {
    showLoading(true)
    deltePost(id)
        .then(({ data, status }) => {
            showLoading(false)
            if (status == 200) {
                history.push("/" + params);
            }

        }).catch(e => { console.error(e); showLoading(false) })
}
const AmisWrapper = (profile, itme) => <Amis profile={profile} itme={itme} />

const Posts = ({ posts, itme }) => {
    const { id } = useParams();
    const history = useHistory();
    const [show, showLoading] = useState(false);
    return (
        <>
            <FlatList
                list={posts}
                renderItem={PostWrapper(itme, deletePost(history, id, showLoading))}
                sort={{
                    by: ["posteLe", { key: "posteLe", descending: false }],
                    descending: true,
                    caseInsensitive: true
                }}
            />
            <Dialog open={show}>
                <Box style={{ padding: 20, margin: 20 }}>
                    <LinearProgress />
                    <CircularProgress hidden={!show} />
                </Box>
            </Dialog>
        </>
    )
}
const userElement = (isAbonnement, itme, history, profile) => ({ userFrom, userTo }) => {

    let id = isAbonnement ? userTo : userFrom
    let classes = useStyle();
    const deleteFreind = () => {
        console.log(id)
        removeFriend(id)
            .then(({ data }) => history.push("/" + profile.userName + '/amis'))
            .catch(e => console.log(e))
    }
    return (
        <div className={classes.userElementContainer}>
            <div className={classes.abonnementInfoContainer}>
                <Avatar aria-label="recipe"
                    className={classes.large}
                >
                    {id.split('')[0]}
                </Avatar>
                <div >
                    <Typography variant="body1" className={classes.mainTypo}>
                        {id}
                    </Typography>
                    <Typography variant="body1" className={classes.secodaryTypo}>
                        {isAbonnement ? "vous êtes abonné à " + id : id + " vous suit"}
                    </Typography>
                </div>
            </div>
            {isAbonnement && itme && <IconButton
                className={classes.removeFreinds}
                onClick={deleteFreind}
                color="secondary">
                <DeleteForeverIcon color="secondary" />
            </IconButton>}
        </div>
    )
}

const Profil = () => {
    const idPanel = "panel1"
    const [showPanel, setPanelVisibilite] = useState(false)
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
    const [updated, setupdated] = useState(false);
    const reload = () => {
        setupdated(old => !old)
    }
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(sate => sate.auth)
    const posts = useSelector(state => state.posts)
    const [itme, setItme] = useState(false)
    const [currentUser, setCurrentUser] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const toogleOpenDialog = () => setOpenDialog(old => !old);
    const { id } = useParams();
    console.log(id)
    const [profile, setProfile] = useState(false)
    const [myProfile, setMyProfile] = useState(false);
    useEffect(() => {
        let getP = async () => {
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
                let profileData = await getProfil(id);
                let myP = await getProfil();
                setItme((profileData.data.userName === userId))

                setProfile(profileData.data);
                setMyProfile(myP.data)

            }
        }

        getP()
    }, [location, auth, updated]);

    const classes = useStyle();
    return (
        <>
            <Grid
                container
                spacing={0}>
                <DrawerNavigation
                    navigations={navigations}
                    classes={classes}
                    user={currentUser}
                    toogleOpenDialog={toogleOpenDialog}
                />



                <Grid item lg={4} sm={10} xs={10} className={classes.accueilRoot}>
                    {profile ?
                        (<>
                            <Header username={profile.firstName} numberOfPosts={profile.posts.length} />
                            <Switch>
                                <Route path="/:id/amis" component={() => AmisWrapper(profile, itme)} />
                                <Route path="/:id" component={() => BodyWrapper(profile, itme, reload, myProfile)} />
                            </Switch>
                        </>)
                        : <CircularProgress />
                    }

                </Grid>

                <RightBar showPanel={showPanel} setPanelVisibilite={setPanelVisibilite} id={idPanel} />

            </Grid >
            <Twesster open={openDialog} toogleOpenDialog={toogleOpenDialog} />
        </>
    )
}

export default Profil;