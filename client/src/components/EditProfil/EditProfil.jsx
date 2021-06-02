import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Dialog, Typography, IconButton } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { signUp } from "../../api/index"
import { AUTH } from '../../constants/actionstype';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { updateProfile } from "../../api/index";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function EditProfil({ open, showPassword, setShowPassord, reload, setOpen, classes, openAlert, setOpenAlert, error, setError, message, setMessage, dispatch, profile }) {

    const initialVlaues = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        password: "",
        bio: profile.bio,
    }

    const id = profile.userName;

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

                    if (!values.firstName) {
                        errors.firstName = 'Required';
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
                    updateProfile(values)
                        .then(({ data, status }) => {
                            setSubmitting(false);
                            console.log(status);
                            console.log(data)
                            setError(false);
                            setMessage("Modification faite avec success");
                            reload()

                        })
                        .catch(error => {
                            setSubmitting(false);

                            if (error.response) {

                                switch (error.response.status) {
                                    case 401:
                                        setMessage("vous n'êtes pas autoriser à modifier les infos de ce compte");
                                        break;
                                    default:
                                        setMessage("erreur de modification");
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
                            Modifier votre profile :
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
                                type={showPassword ? "password" : "text"}
                                label="Mot de passe * "
                                name="password"
                            />
                            <IconButton
                                className={classes.passwordVisibite}
                                onClick={() => setShowPassord(old => !old)}
                                color='primary'>
                                {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
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
                            className={[classes.large_input, classes.margin, classes.SingUpBtn]}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Valider les modifications
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
export default EditProfil;