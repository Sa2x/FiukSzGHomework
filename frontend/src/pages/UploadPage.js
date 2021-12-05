import React, {useState} from "react";
import {Typography, TextField} from "@mui/material";
import {Button} from "@mui/material";
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useHistory} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";
import authMultipartHeader from "../services/AuthMultipartHeader";
import AuthService from "../services/AuthService";
import { useAlert  } from 'react-alert'

const api = axios.create({
    baseURL: `http://localhost:8080/api/images/`
})

const useStyles = makeStyles(() => ({
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

export default function UploadPage() {
    const classes = useStyles()
    const history = useHistory()
    const currentUser = AuthService.getCurrentUser()

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)

    const [image, setImage] = useState(null)

    const alert = useAlert()

    const uploadImage = async () => {
        let formData = new FormData()
        formData.append("file", image)
        formData.append("name", title)

        alert.show("Dolgozunk az ügyön! Kérlek várj!")

        await api.post('/new', formData, { headers: authMultipartHeader() })
            .then(res => {
                alert.show("Sikeres feltöltés főnököm!")
            })
            .catch(err => {
                console.log(err)
                alert.show("Baj van az erőben O-O")
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setTitleError(false)

        console.log(image)

        if (title === "") {
            setTitleError(true)
            alert.show("Ki kellene tölteni a név mezőt hát na!")
        }

        if (image === null) {
            alert.show("Kép kiválasztása nélkül nem fog menni!")
        }

        if (title && image) {
            uploadImage().then(() => {
                history.push('/')
            })
        }
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    return (
    <Container>
        { currentUser ? (
            <Container>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                >
                    Upload Image
                </Typography>

                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        className={classes.field}
                        onChange={(event) => setTitle(event.target.value)}
                        label="Image name"
                        variant="outlined"
                        fullWidth
                        required
                        error={titleError}
                    />

                    <div className={classes.field}>
                        <input
                            type="file"
                            onChange={handleImage}
                        />
                    </div>

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        endIcon={<KeyboardArrowRightIcon/>}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
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