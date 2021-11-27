import React, {useState} from "react";
import {Typography, TextField} from "@mui/material";
import {Button} from "@mui/material";
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useHistory} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:8000/api/images/`
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

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)

    const caff_file = useState('asd')
    const uploaded_by = useState("Beni a bátor")
    const created_by = "Sándor a királyunk"
    const created_at = "2021.11.22. 20:00"
    const comments = ""


    // const uploadImage = async () => {
//     let res = await api.post('/new', { title: "TEST"})
//         .catch(err => console.log(err))
// }

    const handleSubmit = (event) => {
        event.preventDefault()
        setTitleError(false)

        if (title === '') {
            setTitleError(true)
        }

        if(title) {
            fetch('http://localhost:8000/images', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({title, caff_file, uploaded_by, created_by, created_at, comments})
            }).then(() => history.push('/'))
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
                <TextField
                    className={classes.field}
                    onChange={(event) => setTitle(event.target.value)}
                    label="Image name"
                    variant="outlined"
                    fullWidth
                    required
                    error={titleError}
                />
                <div className={classes.field} >
                    <input type="file" />
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