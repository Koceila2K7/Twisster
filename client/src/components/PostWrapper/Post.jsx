import React, { useState } from 'react'
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Dialog, IconButton, LinearProgress, TextField, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import moment from "moment"
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import useStyle from "./style"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FlatList from "flatlist-react";
import { likePost, commentPost } from '../../api/index'
import { USER_NAME_KEY } from '../../constants';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const currentUserUserName = localStorage.getItem(USER_NAME_KEY)

const onLikePost = (id, visibiliteCallback, refresh) => {
    visibiliteCallback(true);
    likePost(id).
        then(({ data, satuts }) => {
            visibiliteCallback(false);
            refresh(data)
        })
        .catch(e => { visibiliteCallback(false); console.error(e) })

}
const onCommente = (id, contenu, visibiliteCallback, refresh) => {
    visibiliteCallback(true);
    commentPost(id, contenu)
        .then(({ data, satuts }) => refresh(data))
        .catch(e => console.log(e))
}

const PostWrapper = (classes) => props =><Post {...props} classes={classes} />

const Post = (props) => {
    const { idCreateur, classes, nomCreateur, contenu, posteLe, likes, commentaires, imageAssocier, _id, supprimable = false, deletedCallback = () => console.log("deleted") } = props
    const [moreDetail, setMoreDetail] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const param = useParams();

    const [show, setShowLoading] = useState(false);

    const refresh = (newPost) => {
        if (param.id)
            history.push(param)
        else {
            dispatch({ type: "LIKE_POST", payload: newPost });
        }

        setisLiked(old => !old)
    }
    const showLoading = b => setShowLoading(b)

    let [isLiked, setisLiked] = useState(likes.filter(e => e === currentUserUserName).length > 0)
    const toogleLike = () => setisLiked(!isLiked)
    const hiddeMordetail = () => { setMoreDetail(false); }
    const showMordetail = () => setMoreDetail(true)

    const getAction = () => {
        if (!supprimable) {
            return null
        }

        return (
            <IconButton aria-label="settings" color="secondary" onClick={(e) => { e.preventDefault(); deletedCallback(_id) }}>
                <DeleteForeverIcon color='secondary' />
            </IconButton>
        )
    }
    return (
        <>
            <Card
                className={classes.root}>
                <CardActionArea
                    onClick={showMordetail}
                >
                    <CardHeader
                        avatar={
                            <Link to={'/'+idCreateur+'/'}>
                            <Avatar

                                className={classes.avatar}>
                                <Typography>{nomCreateur.split('')[0]}</Typography>
                            </Avatar></Link>
                        }
                        action={
                            getAction()
                        }
                        title={idCreateur}

                        subheader={nomCreateur + "    " + moment(posteLe).fromNow()}
                    />
                    {imageAssocier ?
                        <CardMedia
                            className={classes.media}
                            image={imageAssocier.charAt(0) == "d" ? imageAssocier : 'data:image/jpeg;base64,' + imageAssocier}
                            title="Paella dish"
                        /> : null}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {contenu}
                        </Typography>
                    </CardContent>
                </ CardActionArea>

                <CardActions disableSpacing>


                    <IconButton
                        onClick={() => onLikePost(_id, showLoading, refresh)}
                    >
                        {isLiked ? <FavoriteIcon color="secondary" />

                            : <FavoriteBorderIcon color="secondary" />}
                    </IconButton>

                    <Typography variant='body2'>
                        {likes.length}

                    </Typography>
                    <IconButton
                        onClick={showMordetail}
                        aria-label="comment">
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <Typography variant='body2'>
                        {commentaires.length}
                    </Typography>

                </CardActions>
            </Card>

            <MoreDetail
                {...props}
                open={moreDetail}
                isLiked={isLiked}
                toogleLike={toogleLike}
                close={hiddeMordetail} />

            <Dialog open={show}>
                <Box style={{ padding: 20, margin: 20 }}>
                    <LinearProgress />
                    <CircularProgress hidden={!show} />
                </Box>
            </Dialog>
        </>

    )
}

const MoreDetail = (props) => {
    const { open,
        close,
        idCreateur,
        nomCreateur, contenu,
        posteLe, likes,
        commentaires, imageAssocier,
        _id, supprimable = false,
        isLiked, toogleLike,
        deletedCallback = () => console.log("deleted") } = props;

    const [comment, setComment] = useState('')

    const classes = useStyle();
    const write = e => setComment(e.target.value);
    const dispatch = useDispatch()
    const history = useHistory();

    const param = useParams();

    const [show, setShowLoading] = useState(false);

    const refresh = (newPost) => {
        if (param.id)
            history.push(param)
        else {
            dispatch({ type: "LIKE_POST", payload: newPost });
        }
        toogleLike();
    }

    const refreshComment = (newPost) => {
        if (param.id) { history.push(param); }
        else {
            dispatch({ type: "COMMENT_POST", payload: newPost });
        }

    }

    const showLoading = b => setShowLoading(b)

    const getAction = () => {
        if (!supprimable) {
            return null
        }

        return (
            <IconButton aria-label="settings" color="secondary" onClick={(e) => { e.preventDefault(); deletedCallback(_id) }}>
                <DeleteForeverIcon color='secondary' />
            </IconButton>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="xl"
        >
            <Box className={classes.boxContainer}>
                <Card
                    className={classes.root}>
                    <CardActionArea
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    className={classes.avatar}>
                                    {nomCreateur.split('')[0]}
                                </Avatar>
                            }
                            action={
                                getAction()
                            }
                            title={idCreateur}

                            subheader={nomCreateur + "    " + moment(posteLe).fromNow()}
                        />
                        {imageAssocier ?
                            <CardMedia
                                className={classes.media}
                                image={imageAssocier.charAt(0) == "d" ? imageAssocier : 'data:image/jpeg;base64,' + imageAssocier}
                                title="Paella dish"
                            /> : null}
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {contenu}
                            </Typography>
                        </CardContent>
                    </ CardActionArea>

                    <CardActions disableSpacing>


                        <IconButton
                            onClick={() => onLikePost(_id, showLoading, refresh)}
                        >
                            {isLiked ? <FavoriteIcon color="secondary" />

                                : <FavoriteBorderIcon color="secondary" />}
                        </IconButton>

                        <Typography variant='body2'>
                            {likes.length}

                        </Typography>
                        <IconButton
                            aria-label="comment">
                            <ChatBubbleOutlineOutlinedIcon />
                        </IconButton>
                        <Typography variant='body2'>
                            {commentaires.length}
                        </Typography>

                    </CardActions>
                </Card>
                <Card

                >
                    <div
                        className={classes.writeCommenteContainer}
                    >
                        <div
                            className={classes.commenteTextFiled}>

                            <TextField
                                value={comment}
                                onChange={write}
                                style={{ width: "100%" }}
                                variant="outlined"
                                placeholder="Ecrivez votre commentaire ..."

                            />
                        </div>
                        <div>
                            <IconButton color="primary"
                                onClick={() => onCommente(_id, comment, showLoading, refreshComment)}
                            >
                                <SendIcon color="primary" />
                            </IconButton>
                        </div>
                    </div>
                    {commentaires.length > 0 &&
                        <FlatList
                            list={commentaires}
                            renderItem={CommenteElement(classes)}
                            sort={{
                                by: ["posteLe", { key: "posteLe", descending: false }],
                                descending: true,
                                caseInsensitive: true
                            }}

                        />
                    }
                </Card>
            </Box>

        </Dialog>)
}


const a =
{
    "_id": "ZdmU6fAcCCXOQcDbpilista22021-04-27T14:53:25.868Z",
    "idCreateur": "pilista2",
    "nomCreateur": "Yasmine  Oudjani",
    "likes": [],
    "contenu": "j'adode ce post cooool",
    "posteLe": { "$$date": 1619535205868 }
}



const CommenteElement = (classes) => ({ idCreateur, nomCreateur, likes, posteLe, contenu }) => {
    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar
                            className={classes.avatar}>
                            {nomCreateur.split('')[0]}
                        </Avatar>
                    }

                    title={idCreateur}
                    subheader={nomCreateur + "    " + moment(posteLe).fromNow()}
                />
                <CardContent>
                    <Typography
                        variant="body1"
                    >
                        {contenu}
                    </Typography>
                </CardContent>
            </ CardActionArea>
        </Card>)
}

export default PostWrapper