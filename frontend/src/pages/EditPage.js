import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

export default function EditPage() {
    const classes = useStyles()
    const location = useLocation()

    const [image, setImage] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:8000/images/${location.state.id}`)
    //         .then(respone => respone.json())
    //         .then(data => setImage(data))
    // })

    const handleSubmit = (event) => {

    }

    return (
        <Container>
            <Typography
                variant="h6"
                component="h2"
                color="primary"
                gutterBottom
            >
                Edit Image {location.state.id}
            </Typography>

            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    className={classes.field}
                    value={location}
                    // onChange={(event) => setTitle(event.target.value)}
                    label="Image name"
                    variant="outlined"
                    fullWidth
                    required
                    // error={titleError}
                />

                <div className={classes.field} >
                    <input type="file" />
                </div>

                <TextField
                    className={classes.field}
                    // onChange={(event) => setTitle(event.target.value)}
                    label="Uploaded By"
                    variant="outlined"
                    fullWidth
                    required
                    // error={titleError}
                />

                <Typography className={classes.field}>
                    Created By: Geribruu
                </Typography>

                <Typography className={classes.field}>
                    Created At: 2069.420.
                </Typography>

                <Typography className={classes.field}>
                    Commentek listája kell majd ide
                </Typography>


                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    type="cancel"
                    color="secondary"
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Cancel
                </Button>
            </form>
        </Container>
    );
}