import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Dialog, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import style from "./style";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { signUp } from "../../api/index"
import { AUTH } from '../../constants/actionstype';
import { useDispatch } from 'react-redux';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialVlaues = {
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    profilePicture: ''
}


function SingUp({ open, setOpen, classes, openAlert, setOpenAlert, error, setError, message, setMessage, dispatch }) {


    const handleClick = () => {
        setOpenAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    const onClose = () => setOpen(false)
    return (
        <Dialog
            onClose={onClose}
            open={open}>

            <Formik
                initialValues={initialVlaues}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.userName) {
                        errors.userName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    signUp(values)
                        .then(({ data, status }) => {
                            setSubmitting(false);

                            console.log(status);
                            console.log(data)
                            setError(false);
                            setMessage("inscription faite avec success");
                            dispatch({ type: AUTH, data })

                        })
                        .catch(error => {
                            setSubmitting(false);

                            if (error.response) {

                                switch (error.response.status) {
                                    case 409:
                                        setMessage("se compte exite déja");
                                        break;
                                    case 422:
                                        setMessage("Paramètre manquant");
                                        break;
                                    default:
                                        setMessage("erreur d'inscription");
                                        break;
                                }
                            }
                            setError(true);
                            setOpenAlert(true)


                        })

                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={classes.form}>
                        <div className={classes.logoPrincipale}>
                            ⵣ
                        </div>
                        <Typography variant="h5"
                            className={classes.header_title}
                        >
                            Créer votre compte :
                        </Typography>
                        <div>

                            <Field
                                autoFocus
                                variant='outlined'
                                component={TextField}
                                className={classes.margin}
                                name="firstName"
                                type="email"
                                label="Prenom *"
                            />

                            <Field
                                variant='outlined'
                                component={TextField}
                                className={classes.margin}
                                name="lastName"
                                type="email"
                                label="Nom * "
                            />
                        </div>

                        <div className={classes.margin}>
                            <Field
                                variant='outlined'
                                component={TextField}
                                className={classes.large_input}
                                name="userName"
                                type="text"
                                label="userName * "
                            />
                        </div >
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
                        <div className={classes.margin}>
                            <Field
                                variant='outlined'
                                component={TextField}
                                className={classes.large_input}
                                type="text"
                                label="Bio"
                                name="bio"
                                multiline
                                rows={4}
                            />
                        </div>
                        {isSubmitting && <LinearProgress />}
                        <br />

                        <Button
                            className={`${classes.large_input} ${classes.margin} ${classes.SingUpBtn}` }
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            S'inscrire
                         </Button>

                    </Form>
                )}
            </Formik>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog >
    );
}
export default SingUp;