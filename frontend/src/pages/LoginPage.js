import React, {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {makeStyles} from "@mui/styles";
import {useHistory} from "react-router-dom";
import { useAlert  } from 'react-alert'
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

export default function LoginPage() {
    const classes = useStyles()
    const history = useHistory()

    const alert = useAlert()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    // const [alert, setAlert] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if(email && password) {
            AuthService.login(email, password).then(() =>{
                    alert.show("jó vagy")
                    history.push('/')
                }
            )
        }
        //TODO handle wrong cumo
    }

    return (
        <Container className={classes.container}>
            {/*{alert ? <Alert severity="success" >Szép munka be tudtál jelentkezni</Alert>  : <></>}*/}
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