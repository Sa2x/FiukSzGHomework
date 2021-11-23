import React from "react";
import {makeStyles} from "@mui/styles";
import LeftSiteDrawer from "./LeftSiteDrawer";
import TopAppBar from "./TopAppBar";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        page: {
            width: '100%',
            padding: theme.spacing(3)
        },
        toolbar: theme.mixins.toolbar,
    }
});

export default function Layout({children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopAppBar />

            <LeftSiteDrawer />

            <div className={classes.page}>
                <div className={classes.toolbar}/>
                {children}
            </div>
        </div>
    );
}