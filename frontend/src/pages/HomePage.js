import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import ImageCard from "../components/cards/ImageCard";
import Masonry from "react-masonry-css";
import {useHistory} from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";
import AuthService from "../services/AuthService";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {makeStyles} from "@mui/styles";
import {useAlert} from "react-alert";
import { saveAs } from 'file-saver';


const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`,
})

const useStyle = makeStyles(() => ({
    field: {
        marginTop: '100px',
        marginBottom: '20px',
        display: 'block'
    },
    subfield: {
        paddingLeft: '20px',
        display: 'block'
    },
    row: {
        display: "flex",
        alignItems: "center",
        paddingBottom: "20px"
    },
    form: {
        display: "flex",
        width: "50vh",
        paddingLeft: '15px'
    }
}));

export default function HomePage() {
    const classes = useStyle()
    const history = useHistory()
    const alert = useAlert()

    const [images, setImages] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [searchWordError, setSearchWordError] = useState(false)
    const currentUser = AuthService.getCurrentUser()

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    useEffect(() => {
        getImages()
    }, [])

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

    const handleDownload = (id) => {
        let win = window.open(`http://localhost:8080/api/images/${id}/preview`, '_blank')
        win.focus()
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

    const handleSearch = (event) => {
        event.preventDefault()
        setSearchWordError(false)

        if(searchWord === "") {
            setSearchWordError(true)
            alert.show("Search word is empty!")
        }

        if(searchWord) {
            let searchImages = []
            images.map(image => {
                if(image.name === searchWord) {
                    searchImages.push(image)
                }
            })
            setImages(searchImages)
        }
    }

    const handleReset = () => {
        getImages()
    }

    //TODO nincs hatalmad dolgok lekezése: alap user kapjon értesítést hogy nem törölhet és editálhat

    return (
        <Container>
            {currentUser ? (

                    <div>
                        <div className={classes.row}>
                            <Typography
                                variant="h6"
                                component="h2"
                                color="primary"
                                gutterBottom
                                className={classes.field}
                            >
                                Search:
                            </Typography>
                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSearch}
                                className={classes.form}
                            >
                                <TextField
                                    onChange={(event) => setSearchWord(event.target.value)}
                                    label="key word"
                                    variant="outlined"
                                    fullWidth
                                    error={searchWordError}
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    endIcon={<KeyboardArrowRightIcon/>}
                                >
                                    Search
                                </Button>

                            </form>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={handleReset}
                                // endIcon={<KeyboardArrowRightIcon/>}
                            >
                                Reset
                            </Button>
                        </div>


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
                                        handleDownload={handleDownload}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}/>
                                </div>
                            ))}
                        </Masonry>

                    </div>
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