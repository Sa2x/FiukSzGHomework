import React from "react";
import {Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

export default function CommentPage() {
    const location = useLocation()

    return(
        <div>
            <Typography>This is comment page. ID: {location.state.id}</Typography>
        </div>
    )
}