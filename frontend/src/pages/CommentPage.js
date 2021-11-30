import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios from "axios";

// REST
// const api = axios.create({
//     baseURL: `http://localhost:8000/api/images/`
// })

const useStyle = makeStyles(() => ({
    field: {
        marginTop: '100px',
        marginBottom: '20px',
        display: 'block'
    },
    subfield: {
        marginLeft: '20px',
        display: 'block'
    },
    row: {
        display: "flex",
        alignItems: "center",
    }
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()

    // REST
   // const image = useState()
   //
   //  useEffect(() => {
   //      getImage(location.state.id)
   //  })
   //
   // const getImage = async (image_id) => {
   //      try {
   //          let data = await api.get(`/${image_id}`).then(({ data }) => data)
   //          this.setImage({image: data})
   //      } catch(err) {
   //          console.log(err => console.log(err))
   //      }
   //  }
   //
   //  const addComment = async () => {
   //      let rest = await api.post(`/${image.id}/comments/new`, { title: "TEST"})
   //          .catch(err => console.log(err))
   //  }
   //
   //  const deleteComment = async (comment_id) => {
   //      let data = await api.delete(`/${image.id}/comments/del/${comment_id}`)
   //  }

    return(
        <Container >
            <Typography
                variant="h5"
                component="h2"
                color="primary"
                gutterBottom
            >
                Image Details and Comment | Image id:  {location.state.id}
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
                    A csendélet felemelkedése
                </Typography>
            </div>


            <img src="logo192.png" alt="Logo" />

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
                    Geribruuuuuuuuu
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
                    Sasasasasasasasasa
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
                    3010.420.69.
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
                    Comments
                </Typography>
            </div>

        </Container>
    )
}