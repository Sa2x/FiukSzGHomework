import React, {useState} from "react";
import {Typography, TextField} from "@mui/material";
import {Button} from "@mui/material";
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useHistory} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";

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

    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(false)

    const uploadImage = async () => {
        const image = {
            file: this.image
        }

        await api.post('/new', { image })
            .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setImageError(false)

        if(image === null) {
            setImageError(true)
        }

        if(image) {
            uploadImage().then(() => {
                history.push('/')
            })
        }
    }

    return (
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
                <div className={classes.field} >
                    <input
                        type="file"
                        value={image}
                        onChange={(e) => setImage(e.target.files[0])}
                        error
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
    );
}