import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import ImageCard from "../components/cards/ImageCard";
import Masonry from "react-masonry-css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";
import AuthService from "../services/AuthService";

const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`,
})

export default function HomePage() {
    const [images, setImages] = useState([])
    const history = useHistory()

    const currentUser = AuthService.getCurrentUser()

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    useEffect(() => {
        getImages()
    })

    const getImages = async () => {
        try {
            await api.get('/', {headers: authHeader()}).then(res => {
                setImages(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleComment = (image) => {
        history.push({
            pathname: '/comment',
            search: '?query=abc',
            state: {
                image: image
            }
        })
    }

    const handleEdit = (image) => {
        history.push({
            pathname: '/edit',
            search: '?query=abc',
            state: {
                image: image
            }
        })
    }

    const handleDelete = async (image_id) => {
        await api.delete(`/del/${image_id}`, {headers: authHeader()}).then(() => {
            getImages()
        })
    }

    //TODO nincs hatalmad dolgok lekezése: alap user kapjon értesítést hogy nem törölhet és editálhat

    return (
        <Container>
            {currentUser ? (
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map(image => (
                        <div key={image.id}>
                            <ImageCard
                                image={image}
                                handleComment={handleComment}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}/>
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