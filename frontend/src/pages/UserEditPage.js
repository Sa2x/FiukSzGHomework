import React from "react"
import {Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
// import axios from "axios";
//
// const api = axios.create({
//     baseURL: `http://localhost:8000/api/users/`
// })

export default function UserEditPage() {
    const location = useLocation()

    // updateUser = async (id, val) => {
//     let data = await api.patch(`/${id}`, { title: val})
// }

    return (
        <div>
            <Typography>THIS IS EDIT PAGE: {location.state.id}</Typography>
        </div>
    )
}