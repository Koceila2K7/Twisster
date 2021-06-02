import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Container, LinearProgress, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import useStyle from "./style"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from '../../actions/auth';
import { useHistory, useLocation } from "react-router-dom";
import { PROFILE_KEY } from '../../constants';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LogIn({ row, style }) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const auth = useSelector(sate => sate.auth)
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")
    const handleClose = () => setError(false)
    React.useEffect(() => {

        let profile = localStorage.getItem(PROFILE_KEY)
        if (profile) {
            let user = JSON.parse(profile);
            let userId = jwtDecode(user?.token).sub || jwtDecode(user?.token).id
            console.log(userId)
            history.push('/home')
        }
    }, [location, auth])


    const connexionCallBack = (setSubmitting) => (error, message) => {
        console.log("**********")
        setError(error);
        setMessage(message)
        setSubmitting(false)
    }

    const onLogin = (values, setSubmitting) => {

        dispatch(signIn(values, connexionCallBack(setSubmitting)))
    }
    return (
        <div className={!row ? classes.main : null}>
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
                    <Form
                        className={row ? style.form : null}
                    >
                        {
                            !row && <>
                                <div className={classes.logoPrincipale}>
                                    ⵣ
                        </div>
                                <Typography variant="h4"
                                    className={classes.header_title}
                                >
                                    Se connecter à Twister
                        </Typography>
                            </>

                        }
                        <div className={row ? style.maringR : classes.margin}>
                            <Field
                                variant='outlined'
                                component={TextField}
                                className={row ? null : classes.large_input}
                                name="email"
                                type="email"
                                label="Email * "
                            />
                        </div >
                        <div className={row ? style.maringR : classes.margin}>
                            <Field
                                variant='outlined'
                                component={TextField}
                                className={row ? null : classes.large_input}
                                type="password"
                                label="Mot de passe * "
                                name="password"
                            />
                        </div>

                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            className={row? style.top_btn_login: [classes.large_input, classes.margin, classes.SingUpBtn]}
                            variant={row ? "outlined" : "contained"}
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
        </div>
    );
}
export default LogIn;