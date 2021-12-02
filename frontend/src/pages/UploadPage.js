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
    const [imageError, setImageError] = useState(false)

    const uploadImage = async () => {
        const image = {
            file: this.image
        }

        await api.post('/new', {image})
            .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setTitleError(false)
        setImageError(false)

        console.log(image)

        if (title === "") {
            setTitleError(true)
        }

        if (image === null) {
            setImageError(true)
        }

        if (title && image) {
            let formData = new FormData()
            formData.append("file", image)
            formData.append("name", title)

            // uploadImage().then(() => {
            //     history.push('/')
            // })

            api.post('/new', formData, { headers: authMultipartHeader() })
                .then(res => {
                    console.log(`Success` + res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleImage = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0]
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