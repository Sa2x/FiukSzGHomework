import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import Masonry from "react-masonry-css";
import UserCard from "../components/cards/UserCard";
import {useHistory} from "react-router-dom";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:8080/user/`
})

export default function UsersPage() {
    const history = useHistory()
    const [users, setUsers] = useState([])

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
            // let data = await api.get('/').then(({ data }) => data)
            // setUsers(data)
            await api.get('/').then(res => {
                    const persons = res.data
                    setUsers(persons)
                }
            )
        } catch(err) {
            console.log(err)
        }
    }

    const handleEdit = (id) => {
        history.push({
            pathname: '/user_edit',
            search: '?query=abc',
            state: {
                id: id
            }
        })
    }

    const handleDelete = async (id) => {
        await api.delete(`/del/${id}`).then(() => {
                getUsers()
            }
        )
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column" >
                {users.map(user => (
                    <div key={user.id}>
                        <UserCard user={user} handleEdit={handleEdit}
                              handleDelete={handleDelete}  />
                    </div>
                    ))}
            </Masonry>
        </Container>
    );
}