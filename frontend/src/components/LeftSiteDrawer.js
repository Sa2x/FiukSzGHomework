import React from "react";
import {Drawer, List, ListItem, ListItemText, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        drawer: {
            width: drawerWidth,
        },
        title: {
            padding: theme.spacing(2)
        },
    };
});

const menuItems = [
    {
        text: 'Home',
        path: '/'
    },
];

export default function LeftSiteDrawer() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
        >
            <Typography variant="h5" className={classes.title} >
                Menu
            </Typography>
            <List>
                {menuItems.map(item => (
                    <ListItem
                        button
                        key={item.text}
                    >
                        <ListItemText primary={item.text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>


    );
}