import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import ImageCard from "../components/cards/ImageCard";
import Masonry from "react-masonry-css";
import {useHistory} from "react-router-dom";
import axios from "axios";

//db indítás
//json-server --watch data/db.json --port 8000

// axois examples
//
// const api = axios.create({
//     baseURL: `http://localhost:8000/api/images/`
// })
//
// getImages = async () => {
//     try {
//         let data = await api.get('/').then(({ data }) => data)
//         setImages({images: data})
//     } catch(err) {
//         console.log(err)
//     }
// }
//
// uploadImage = async () => {
//     let res = await api.post('/', { title: "TEST"})
//         .catch(err => console.log(err))
//     getImages()
// }
//
// deleteImage = async (id) => {
//     let data = await api.delete(`/${id}`)
//     getImages()
// }
//
// updateImage = async (id, val) => {
//     let data = await api.patch(`/${id}`, { title: val})
// }

const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`
})

export default function HomePage() {
    const [images, setImages] = useState([])
    const history = useHistory()

    // useEffect(() => {
    //     fetch('http://localhost:8000/images')
    //         .then(respone => respone.json())
    //         .then(data => setImages(data))
    // }, [])

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
            await api.get('/').then(res => {
                const data = res.data
                setImages(data)
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