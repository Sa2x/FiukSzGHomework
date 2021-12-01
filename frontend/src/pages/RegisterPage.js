import React, {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {makeStyles} from "@mui/styles";
import {useHistory} from "react-router-dom";
import axios from "axios";
import AuthService from "../services/AuthService";

const api = axios.create({
    baseURL: `http://localhost:8080/user/`
})

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

export default function RegisterPage() {
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmedPasswordError, setConfirmedPasswordError] = useState(false)

    const register = async () => {
        const user = {
            email: this.email,
            password: this.password,
            confirmedPassword: this.confirmedPassword
        }

         await api.post('/register', { user })
             .catch(err => console.log(err))
     }

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
                this.email,
                this.password,
                this.confirmedPassword).then(() => {
                    history.push('/')
                }
            )
        }
    }

    return (
        <Container className={classes.container}>
            <Typography
                variant="h6"
                component="h2"
                color="primary"
                gutterBottom
            >
                Login
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