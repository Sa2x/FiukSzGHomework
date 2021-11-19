import React from "react";
import {RadioGroup, Typography, Radio, TextField, FormControlLabel, FormLabel, FormControl} from "@mui/material";
import {Button} from "@mui/material";
import {Container} from "@mui/material";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {makeStyles} from "@mui/styles";
import {useHistory} from 'react-router-dom'

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
                Create a New Note
            </Typography>

            <form
                noValidate
                autoComplete="off"
                // onSubmit={handleSubmit}
            >
                <TextField
                    className={classes.field}
                    // onChange={(event) => setTitle(event.target.value)}
                    label="Note Title"
                    variant="outlined"
                    fullWidth
                    required
                    // error={titleError}
                />
                <TextField
                    className={classes.field}
                    // onChange={(event) => setDetails(event.target.value)}
                    label="Details"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    // error={detailsError}
                />

                {/*<FormControl className={classes.field}>*/}
                {/*    <FormLabel>Note Category</FormLabel>*/}
                {/*    <RadioGroup value={category} onChange={(event) => setCategory(event.target.value)}>*/}
                {/*        <FormControlLabel value="money" control={<Radio/>} label="Money"/>*/}
                {/*        <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>*/}
                {/*        <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>*/}
                {/*        <FormControlLabel value="work" control={<Radio/>} label="Work"/>*/}
                {/*    </RadioGroup>*/}
                {/*</FormControl>*/}

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    // endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}