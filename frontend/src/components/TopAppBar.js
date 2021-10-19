import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const drawerWidth = 240;

const useStyles = makeStyles({
   appbar: {
       width: `calc(100% - ${drawerWidth}px)`
   }
});

export default function TopAppBar() {
    const classes = useStyles();

    return (
        <AppBar
            className={classes.appbar}
            position="fixed"
            elevation={0}
        >
            <Toolbar>
                <Typography>
                    Fiuk's Image Store
                </Typography>
            </Toolbar>
        </AppBar>
    );
}