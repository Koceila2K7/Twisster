import { Button, Grid, TextField, Typography, LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import banniere from '../../images/lohp_1302x955.png'
import styles from "./style";
import SingUp from "../SingUp/SingUp";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { signIn } from '../../actions/auth';
import { PROFILE_KEY } from '../../constants';
import { useHistory, useLocation } from "react-router-dom";
import signupStyle from "../SingUp/style";
import { Formik, Form, Field } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwtDecode from 'jwt-decode';
import LogIn from '../LogIn/Login';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const a = { email: "yasmineoudjani2@gmail.com", password: "supermptdepasse" }

const SplashLogin = ({ dispatch }) => {
    const [error, setError] = useState(false);
    const classes = styles();
    const connexionCallBack = (setSubmitting) => (error, message) => {
        console.log("**********")
        setError(error);
        setMessage(message)
        setSubmitting(false)
    }

    const onLogin = (values, setSubmitting) => {

        dispatch(signIn(values, connexionCallBack(setSubmitting)))
    }
    const [message, setMessage] = useState("")
    const handleClose = () => setError(false)
    return (<div>
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                onLogin(values, setSubmitting)
            }}
        >
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <div className={classes.logoPrincipale}>
                        ⵣ
                        </div>
                    <Typography variant="h4"
                        className={classes.header_title}
                    >
                        Se connecter à Twister
                        </Typography>
                    <div className={classes.margin}>
                        <Field
                            variant='outlined'
                            component={TextField}
                            className={classes.large_input}
                            name="email"
                            type="email"
                            label="Email * "
                        />
                    </div >
                    <div className={classes.margin}>
                        <Field
                            variant='outlined'
                            component={TextField}
                            className={classes.large_input}
                            type="password"
                            label="Mot de passe * "
                            name="password"
                        />
                    </div>

                    {isSubmitting && <LinearProgress />}
                    <br />
                    <Button
                        className={
                            `${classes.large_input} ${classes.margin} ${classes.SingUpBtn}`
                        }
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Se connecter
                         </Button>
                </Form>
            )}
        </Formik>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    </div>)
}


export const Splash = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const location = useLocation();
    const history = useHistory();
    const signupclasses = signupStyle();
    const dispatch = useDispatch()
    const classes = styles();
    const [signupOpen, setSignupOpen] = useState(false);
    const showSignUpDialog = () => setSignupOpen(true)
    const auth = useSelector(sate => sate.auth)
    useEffect(() => {

        let profile = localStorage.getItem(PROFILE_KEY)
        if (profile) {
            let user = JSON.parse(profile);
            let userId = jwtDecode(user?.token).sub || jwtDecode(user?.token).id
            console.log(userId)
            history.push('/home')
        }
    }, [location, auth])

    const [connectionState, setConnectionState] = useState(
        {
            email: "",
            password: ""
        })
    const onLogin = () => {
        dispatch(signIn(connectionState))
    }
    const handelEmailChange = (e) => setConnectionState(old => ({ ...old, email: e.target.value }))
    const handelPasswordChange = (e) => setConnectionState(old => ({ ...old, password: e.target.value }))

    return (
        <>
            <Grid
                container
                spacing={10}
                className={classes.container}>

                <Grid
                    item
                    className={classes.image_container}
                    lg={6}>
                    <img
                        alt='bannière'
                        src={banniere}
                    />
                    <div className={classes.logo}>
                        ⵣ
                </div>
                </Grid>
                <Grid item lg={6}
                    style={
                        {
                            maxHeight: "100vh"
                        }
                    }
                >
                    <div>
                        <LogIn row={true} style={classes} />
                    </div>
                    <div className={classes.main}>
                        <div className={classes.logoPrincipale}>
                            ⵣ
                    </div>
                        <Typography variant='h1' className={`${classes.Typography} ${classes.TypographyMain} `}>
                            Ça se passe maintenant
                    </Typography>

                        <Typography variant='h3'>
                            Rejoignez Twister dès aujourd'hui.
                    </Typography>
                        <div className={classes.actions}>

                            <Button
                                className={classes.btn_shape}
                                variant="contained"
                                color="primary"
                                onClick={showSignUpDialog}

                            >
                                S'inscrire
                         </Button>

                            <Button
                                component={Link}
                                to='/login'
                                className={classes.btn_shape}
                                variant="outlined"
                                color='primary'>
                                se connecter
                                 </Button>

                        </div>
                    </div>
                </Grid>
            </Grid>

            <SingUp classes={signupclasses}
                open={signupOpen}
                setOpen={setSignupOpen}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
                dispatch={dispatch}
            />
        </>
    )
}
