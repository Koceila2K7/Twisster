import React , {useState} from "react"
import useStyle from "./style"
import SearchIcon from '@material-ui/icons/Search';
import Post from '../PostWrapper/Post';
import poststyle from '../PostWrapper/style';

import FlatList from 'flatlist-react';
import { CircularProgress, FormControlLabel, Grid, InputBase, Typography } from "@material-ui/core";
import IOSSwitch from "../IOSSwitch";
import UserElement from "./UserElement";
import { search } from "../../api";

const RightBar = ({ showPanel, setPanelVisibilite, id }) => {
    const [freindOnly, setFreindOnly] = useState(false)
    const handleChange = e => setFreindOnly(e.target.checked)
    const [qeury, setQeury] = useState('');
    const [result, setResult] = useState({ result: { users: [], posts: [] }, isLoanding: false });
    const [isLoanding, setIsLoanding] = useState(false)
    const handleQuery = e => setQeury(e.target.value)
    const classes = useStyle();

    const onChange = ({ code }) => {
        if (code != "Enter")
            return
        console.log("in on change")
        setResult(old => ({ ...old, isLoanding: true }));
        search(qeury, freindOnly)
            .then(({ data }) => { setResult(old => ({ result: data, isLoanding: false })); })
            .catch(e => { setResult(old => ({ ...old, isLoanding: false })) })

    }
    const postclasses = poststyle();


    return (
        <Grid item
            className={classes.RightBar}
            lg={4}
            sm={false}
        >
            <div
                id={id}

            >
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon color="primary" />
                    </div>
                    <InputBase
                        value={qeury}
                        onKeyPress={onChange}
                        onChange={handleQuery}
                        onClick={() => setPanelVisibilite(true)}
                        className={classes.rechercheInput}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />



                </div>

                <div
                    className={classes.serachePanel}
                    style={{ visibility: showPanel ? 'visible' : 'hidden' }}
                >

                    <FormControlLabel
                        control={
                            <IOSSwitch
                                checked={freindOnly}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label={<Typography variant="body1">Freind Only</Typography>}
                    />
                    {result.isLoanding && <CircularProgress
                        color="primary"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%"
                        }}
                    />}
                    <Typography>Utilisateurs</Typography>
                    < FlatList
                        list={result.result.users}
                        renderItem={UserElement(classes)}

                    />
                    <Typography>Publications</Typography>
                    < FlatList
                        list={result.result.posts}
                        renderItem={Post(postclasses)}
                        sort={{
                            by: ["posteLe", { key: "posteLe", descending: false }],
                            descending: true,
                            caseInsensitive: true
                        }}
                    />

                </div>
            </div>
        </Grid>
    )
}
export default RightBar;