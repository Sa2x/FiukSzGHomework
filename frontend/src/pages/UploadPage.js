import React from "react";
import {RadioGroup, Typography, Radio, TextField, FormControlLabel, FormLabel, FormControl} from "@mui/material";
import {Button} from "@mui/material";
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useHistory} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

export default function UploadPage() {
    const classes = useStyles()
    const history = useHistory()

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
                // onSubmit={handleSubmit}
            >
                <TextField
                    className={classes.field}
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