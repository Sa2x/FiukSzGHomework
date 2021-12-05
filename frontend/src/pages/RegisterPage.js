import React, {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {makeStyles} from "@mui/styles";
import {useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";

const useStyles = makeStyles(() => ({
    container: {
        justifyContent: "center",
        display: "flex"
    },
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

//TODO ha be vagy jeelntkezve ne tudd megnyitni

export default function RegisterPage() {
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmedPasswordError, setConfirmedPasswordError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setEmailError(false)
        setPasswordError(false)
        setConfirmedPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }
        if (confirmedPassword === '') {
            setConfirmedPasswordError(true)
        }

        if(email && password && confirmedPassword) {
            AuthService.register(
                email,
                password,
                confirmedPassword
            ).then(() => {
                    history.push('/login')
                }
            )
        }

        //TODO handle wrong cumo
    }

    return (
        <Container className={classes.container}>
            <Typography
                variant="h6"
                component="h2"
                color="primary"
                gutterBottom
            >
                Register
            </Typography>

            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    className={classes.field}
                    onChange={(event) => setEmail(event.target.value)}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    error={emailError}
                />

                <TextField
                    className={classes.field}
                    onChange={(event) => setPassword(event.target.value)}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    error={passwordError}
                />

                <TextField
                    className={classes.field}
                    onChange={(event) => setConfirmedPassword(event.target.value)}
                    label="Password Confirm"
                    variant="outlined"
                    fullWidth
                    required
                    error={confirmedPasswordError}
                />

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
}