import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import ImageCard from "../components/cards/ImageCard";
import Masonry from "react-masonry-css";
import {useHistory} from "react-router-dom";
import * as path from "path";

//db indítás
//json-server --watch data/db.json --port 8000

export default function HomePage() {
    const [images, setImages] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch('http://localhost:8000/images')
            .then(respone => respone.json())
            .then(data => setImages(data))
    }, [])

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    const handleEdit = (id) => {
        history.push({
            pathname: '/edit',
            search: '?query=abc',
            state: {
                id: id
            }}
        )
    }

    const handleDelete = async (id) => {
        await fetch('http://localhost:8000/images/' + id, {
            method: 'DELETE'
        })

        const newImages = images.filter(image => image.id !== id)
        setImages(newImages)
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
                        <ImageCard image={image} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}