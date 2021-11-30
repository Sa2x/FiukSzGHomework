import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => {
    return {
        title: {
            flexGrow: 1,
            paddingLeft: '100px'
        },
        link: {
            fontFamily: 'Quicksand',
            textDecoration: "none",
            marginRight: '10px',
            fontSize: '20px',
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