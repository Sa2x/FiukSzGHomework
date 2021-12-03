import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import Masonry from "react-masonry-css";
import UserCard from "../components/cards/UserCard";
import {useHistory} from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";
import AuthService from "../services/AuthService";

const api = axios.create({
    baseURL: `http://localhost:8080/user/`
})

export default function UsersPage() {
    const history = useHistory()
    const [users, setUsers] = useState([])

    const currentUser = AuthService.getCurrentUser()

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    useEffect(() => {
        getUsers()
    })

    const getUsers = async () => {
        try {
            await api.get('/', { headers: authHeader() }).then(res => {
                    const persons = res.data
                    setUsers(persons)
                }
            )
        } catch(err) {
            console.log(err)
        }
    }

    const handleEdit = (user) => {
        history.push({
            pathname: '/user_edit',
            search: '?query=abc',
            state: {
                user: user
            }
        })
    }

    const handleDelete = async (id) => {
        await api.delete(`/del/${id}`, { headers: authHeader() }).then(() => {
                getUsers()
            }
        )
    }

    return (
    <Container>
        { currentUser ? (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column" >
                {users.map(user => (
                    <div key={user.id}>
                        <UserCard
                            user={user}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}  />
                    </div>
                ))}
            </Masonry>
        ) : (
            <Typography
                variant="h1"
            >
                You have to login
            </Typography>
        )
        }
    </Container>
    );
}