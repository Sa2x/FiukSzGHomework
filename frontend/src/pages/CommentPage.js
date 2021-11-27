import React, {useState} from "react";
import {Container, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios from "axios";

// const api = axios.create({
//     baseURL: `http://localhost:8000/api/images/`
// })

const useStyle = makeStyles(() => ({
    container: {
        alignContent: "center"
    },
    field: {
        marginTop: '20px',
        marginBottom: '20px',
        display: 'block',
    },
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()

   //  const image = useState()
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
   //      let rest = await api.post(`/${image.id}/comments/new`)
   //          .catch(err => console.log(err))
   //  }
   //
   //  const deleteComment = async (comment_id) => {
   //      let data = await api.delete(`/${image.id}/comments/del/${comment_id}`)
   //  }

    return(
        <Container classes={classes.container}>
            <Typography>This is comment page. ID: {location.state.id}</Typography>
            <Typography>Name: A csendélet felemelkedése</Typography>
            <img src="logo192.png" alt="Logo" />
            <Typography>Uploaded By: Geribruuuuuuuuu</Typography>
            <Typography>Created By: Sasasasasasasasasa</Typography>
            <Typography>Created At: 3010.420.69.</Typography>
            <Typography>Comment lista, ami még kell lol</Typography>
        </Container>
    )
}