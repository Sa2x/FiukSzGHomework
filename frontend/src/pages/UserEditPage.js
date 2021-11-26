import React from "react"
import {Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

export default function UserEditPage() {
    const location = useLocation()

    return (
        <div>
            <Typography>THIS IS EDIT PAGE: {location.state.id}</Typography>
        </div>
    )
}