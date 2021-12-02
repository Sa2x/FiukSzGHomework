import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import ImageCard from "../components/cards/ImageCard";
import Masonry from "react-masonry-css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";

const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`,
})

export default function HomePage() {
    const [images, setImages] = useState([])
    const history = useHistory()

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
        } catch(err) {
            console.log(err)
        }
    }

    const handleComment = (id) => {
        history.push({
            pathname: '/comment',
            search: '?query=abc',
            state: {
                id: id
            }
        })
    }

    const handleEdit = (id) => {
        history.push({
            pathname: '/edit',
            search: '?query=abc',
            state: {
                id: id
            }
        })
    }

    const handleDelete = async (image_id) => {
       await api.delete(`/del/${image_id}`).then(() => {
           getImages()
       })
    }

    return (
        <Container>
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
                            handleDelete={handleDelete} />
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}