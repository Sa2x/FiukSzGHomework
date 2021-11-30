import React from "react";
import {Container, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyle = makeStyles(() => ({
    container: {
        alignContent: "center"
    },
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()

    return(
        <Container classes={classes.container}>
            <Typography>This is comment page. ID: {location.state.id}</Typography>
            <Typography>Name: A csendélet felemelkedése</Typography>
            <img src="logo192.png" alt="Logo" />
            <Typography>Uploaded By: Geribruuuuuuuuu</Typography>
            <Typography>Created By: Sasasasasasasasasa</Typography>
            <Typography>Created At: 3010.420.69.</Typography>
            <Typography>Comment lista, ami még kell lol</Typography>
        </Container>
    )
}