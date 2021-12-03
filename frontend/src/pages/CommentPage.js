import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import Masonry from "react-masonry-css";
import CommentCard from "../components/cards/CommentCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import authHeader from "../services/AuthHeader";
import {useAlert} from 'react-alert'

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
        width: "50vh"
    }
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()
    const alert = useAlert()

    const image = location.state.image

    const [preview, setPreview] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const [comments, setComments] = useState(image.comments)
    const [commentMessage, setCommentMessage] = useState('')
    const [commentMessageError, setCommentMessageError] = useState(false)

    useEffect(() => {
        getPreview()
    })

    const getPreview = async () => {
        await api.get(`${image.id}/preview`, {headers: authHeader()}).then(res => {
            console.log(res.data)
            setPreview(res.data)
            setIsLoaded(true)
        })
    }

    //TODO rosszul jön a comment backend javítsa meg ellenőrzés
    const getComments = async () => {
        try {
            await api.get(`/${image.id}/comments/`, {headers: authHeader()}).then(res =>
                setComments(res.data)
            )
        } catch (err) {
            console.log(err => console.log(err))
        }
    }

    const addComment = async () => {
        const message = {
            message: commentMessage
        }

        await api.post(`/${image.id}/comments/new`, message, {headers: authHeader()})
            .then(() => {
                getComments()
                alert.show("Írtál egy kommentet!")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setCommentMessageError(false)

        if (commentMessage === '') {
            setCommentMessageError(true)
            alert.show("Szöveg nélkül nehéz lesz bármit is küldeni")
        }

        if (commentMessage) {
            addComment()
        }
    }

    const handleDelete = async (comment_id) => {
        try {
            await api.delete(`/${image.id}/comments/del/${comment_id}`, {headers: authHeader()}).then(() => {
                getComments()
            })
        } catch (err) {
            console.log(err => console.log(err))
            alert.show("Itt nincs hatalmad")
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
                Image Details and Comment | Image id: {image.id}
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
                    {image.name}
                </Typography>
            </div>

            {/*TODO kép megjelenítése*/}
            { isLoaded ? (
                <img src={`data:image/jpg;base64,${preview}`} alt="Logo"/>
            ): (
                <div/>
            ) }

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
                    {image.uploadedBy.email}
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
                    {image.createdBy}
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
                    {image.createdAt}
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
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <CommentCard
                                comment={comment}
                                handleDelete={handleDelete}/>
                        </div>
                    ))}
                </Masonry>
            </Container>
        </Container>
    )
}