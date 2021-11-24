import React from "react";
import {AppBar, Avatar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
    avatar: {
        marginLeft: theme.spacing(2)
    },
    title: {
        flexGrow: 1
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
                <Typography className={classes.title}>
                    Fiuk's Image Store
                </Typography>
                <Typography>Snoopy</Typography>
                <Avatar src="snoopy.png" className={classes.avatar}/>
            </Toolbar>
        </AppBar>
    );
}