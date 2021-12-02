import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import Masonry from "react-masonry-css";
import CommentCard from "../components/cards/CommentCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import authHeader from "../services/AuthHeader";

const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`
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
    },
    commentTitle: {
        flexGrow: 1
    },
    form: {
        display: "flex",
        width: "100vh"
    }
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()

    const image_id = location.state.id

    const [image, setImage] = useState([])
    const [preview, setPreview] = useState([])


    const [commentMessage, setCommentMessage] = useState('')
    const [commentMessageError, setCommentMessageError] = useState(false)

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    useEffect(() => {
        getImage()
        // getPreview()
    })

    const getImage = async () => {
        try {
            await api.get(`/${image_id}`, {headers: authHeader()}).then(res => {
                setImage(res.data)
            })
        } catch (err) {
            console.log(err => console.log(err))
        }
    }

    // const getPreview = async () => {
    //     try {
    //         await api.get(`/${image_id}/preview`, {headers: authHeader()}).then(res => {
    //             setPreview(res.data)
    //         })
    //     } catch (err) {
    //         console.log(err => console.log(err))
    //     }
    // }

     const addComment = async () => {
        const message = {
            comment: commentMessage
            //TODO kiegészíetni
        }

        await api.post(`/${image.id}/comments/new`, message, {headers: authHeader()} )
             .catch(err => console.log(err))
     }

    const handleSubmit = (event) => {
        event.preventDefault()
        setCommentMessageError(false)

        if(commentMessage === '' ) {
            setCommentMessageError(true)
        }

        if(commentMessage) {
            addComment()
        }
    }

    const handleDelete = async (comment_id) => {
        try {
            await api.delete(`/${image.id}/comments/del/${comment_id}`).then(() => {
                getImage()
            })
        } catch (err) {
            console.log(err => console.log(err))
        }
    }

    return (
        <Container>
            <Typography
                variant="h5"
                component="h2"
                color="primary"
                gutterBottom
            >
                Image Details and Comment | Image id: {location.state.id}
            </Typography>

            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.field}
                >
                    Image Title:
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="secondary"
                    gutterBottom
                    className={classes.subfield}
                >
                    {image[0].name}
                </Typography>
            </div>

            //TODO kép megjelenítés
            <img src={preview} alt="Logo"/>

            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.field}
                >
                    Uploaded By:
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="secondary"
                    gutterBottom
                    className={classes.subfield}
                >
                    {image[0].uploadedBy}
                </Typography>
            </div>

            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.field}
                >
                    Created By:
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="secondary"
                    gutterBottom
                    className={classes.subfield}
                >
                    {image[0].createdBy}
                </Typography>
            </div>

            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.field}
                >
                    Created At:
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="secondary"
                    gutterBottom
                    className={classes.subfield}
                >
                    {image[0].createdAt}
                </Typography>
            </div>

            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.commentTitle}
                >
                    Comments
                </Typography>

                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <TextField
                        onChange={(event) => setCommentMessage(event.target.value)}
                        label="Comment Message"
                        variant="outlined"
                        fullWidth
                        required
                        error={commentMessageError}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        endIcon={<KeyboardArrowRightIcon/>}
                    >
                        Submit
                    </Button>
                </form>
            </div>

            <Container>
                 <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column" >
                    {image[0].comments.map(comment => (
                        <div key={comment.id}>
                            <CommentCard comment={comment} handleDelete={handleDelete}/>
                        </div>
                        ))}
                </Masonry>
            </Container>
        </Container>
    )
}