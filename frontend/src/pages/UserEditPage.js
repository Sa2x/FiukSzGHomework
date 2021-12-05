import React, {useState} from "react"
import {Button, Container, TextField, Typography} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import authHeader from "../services/AuthHeader";
import {makeStyles} from "@mui/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useAlert} from "react-alert";


const api = axios.create({
    baseURL: `http://localhost:8080/user/`
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
    form: {
        display: "flex",
        width: "50vh",
        paddingLeft: '15px'
    }
}));

export default function UserEditPage() {
    const classes = useStyle()
    const location = useLocation()
    const history = useHistory()
    const alert = useAlert()

    const user = location.state.user

    const [newEmail, setNewEmail] = useState('')
    const [newEmailError, setNewEmailError] = useState(false)

    const updateUser = async () => {
        const newUser = {
            email: newEmail
        }

        await api.put(`/edit/${user.id}`, newUser, {headers: authHeader()})
            .then(alert.show('Szépen megváltoztattuk, így most nem fog tudni belépni'))
            .catch(err => {
                console.log(err)
                alert.show("Ehhez nincs jogod!")
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(newEmail === "") {
            setNewEmailError(true)
        }

        if(newEmail) {
            updateUser().then(() => {
                history.push('/users')
            })
        }
    }

    return (
        <Container>
            <div className={classes.row}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    gutterBottom
                    className={classes.field}
                >
                    Current user email:
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    color="secondary"
                    gutterBottom
                    className={classes.subfield}
                >
                    {user.email}
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
                    Set new user email:
                </Typography>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <TextField
                        onChange={(event) => setNewEmail(event.target.value)}
                        label="New User Email"
                        variant="outlined"
                        fullWidth
                        required
                        error={newEmailError}
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
        </Container>
    )
}