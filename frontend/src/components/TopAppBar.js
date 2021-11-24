import React from "react";
import {AppBar, Avatar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return {
        title: {
            flexGrow: 1,
            marginLeft: '100px'
        },
        link: {
            fontFamily: 'Quicksand',
            textDecoration: "none",
            marginRight: '10px',
            fontSize: '24px',
            color: "black"
        }
}});

export default function TopAppBar() {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            elevation={0}
        >
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Fiuk's Image Store
                </Typography>
                <Link className={classes.link} to='/login'>Login</Link>
                <Link className={classes.link} to='/register'>Register</Link>
            </Toolbar>
        </AppBar>
    );
}