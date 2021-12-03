import React, {useEffect, useState} from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import axios from "axios";
import AuthService from "../services/AuthService";
import authHeader from "../services/AuthHeader";

const api = axios.create({
    baseURL: `http://localhost:8080/user/`
})

const useStyles = makeStyles(() => {
    return {
        title: {
            flexGrow: 1,
            paddingLeft: '100px'
        },
        loggedIn: {
            display: "flex"
        },
        link: {
            fontFamily: 'Quicksand',
            textDecoration: "none",
            marginRight: '10px',
            fontSize: '20px',
            color: "black"
        },
        email: {
            paddingRight: '20px'
        },
        logout: {
            fontFamily: 'Quicksand',
            textDecoration: "none",
            fontSize: '20px',
            color: "black",
            paddingTop: "2px"

        }
}});

export default function TopAppBar() {
    const classes = useStyles();

    const [email, setEmail] = useState('')
    const currentUser = AuthService.getCurrentUser()

    useEffect(() => {
        getEmail()
    })

    const getEmail = async () => {
        await api.get(("/me"), { headers: authHeader()} ).then(res => {
            setEmail(res.data.email)
        })
    }

    return (
        <AppBar
            position="fixed"
            elevation={0}
        >
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Fiuk's Image Store
                </Typography>
                { currentUser ? (
                    <div className={classes.loggedIn}>
                        <Typography variant="h6" className={classes.email}>
                           {email}
                        </Typography>
                        <a href="/login" className={classes.logout} onClick={AuthService.logout}>
                            LogOut
                        </a>
                    </div>
                    //TODO fix logout design

                ) : (
                    //TODO belépés utén nem jön fel a logout csak miután frissitettem az oldalt
                    <div>
                        <Link className={classes.link} to='/login'>Login</Link>
                        <Link className={classes.link} to='/register'>Register</Link>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}