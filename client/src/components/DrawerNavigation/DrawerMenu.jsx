import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";
import { signOut } from '../../actions/auth';
import IOSSwitch from '../IOSSwitch';
import {  toogle_freind_only } from '../../actions/posts';
import { Button, Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Dialog, FormControlLabel, Grid, Icon, IconButton, InputBase, List, Tooltip, Typography, withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from "./style"

import { useDispatch, useSelector } from "react-redux"
import DrawerItem from './DrawerItem';

const DrawerNavigation = ({ classes, user, toogleOpenDialog, navigations }) => {
    const dispatch = useDispatch();
    const classes2 = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();
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
    const goToMyProfile = () => {
        let param = user ? user?.id ? user.id : user.sub : null
        if (param) {
            history.push('/' + param)
        }
    }
    const freindOnly = useSelector(state => state.posts.freindOnly)
    const posts = useSelector(state => state.posts)

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const toogleFreindOnly = () => {
        dispatch(toogle_freind_only({ ...posts, posts: undefined }))
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (<Grid item lg={4} sm={2} xs={2} className={classes.drawerContainer}>
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
            <FormControlLabel
                control={<IOSSwitch checked={freindOnly} name="checkedB" onChange={toogleFreindOnly} />}
                label="Freinds only"
            />
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

export default DrawerNavigation;