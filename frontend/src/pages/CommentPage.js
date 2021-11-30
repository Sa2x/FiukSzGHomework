import React, {useEffect, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios from "axios";
import Masonry from "react-masonry-css";
import CommentCard from "../components/cards/CommentCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
        paddingLeft: '20px',
        display: 'block'
    },
    row: {
        display: "flex",
        alignItems: "center",
    },
    commentTitle: {
        flexGrow: 1
    },
    form: {
        display: "flex",
        width: "100vh"
    }
}));

export default function CommentPage() {
    const classes = useStyle()
    const location = useLocation()

    const [commentMessage, setCommentMessage] = useState('')
    const [commentMessageError, setCommentMessageError] = useState(false)

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

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

    const handleSubmit = (event) => {

    }

    const handleDelete = async (comment_id) =>{

    }

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
                    className={classes.commentTitle}
                >
                    Comments
                </Typography>

                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <TextField
                        onChange={(event) => setCommentMessage(event.target.value)}
                        label="Comment Message"
                        variant="outlined"
                        fullWidth
                        required
                        error={setCommentMessageError}
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
             <Container>
                {/* <Masonry*/}
                {/*    breakpointCols={breakpoints}*/}
                {/*    className="my-masonry-grid"*/}
                {/*    columnClassName="my-masonry-grid_column" >*/}
                {/*    {comments.map(comment => (*/}
                {/*        <div key={comment.id}>*/}
                {/*            <CommentCard comment={comment}/>*/}
                {/*        </div>*/}
                {/*        ))}*/}
                {/*</Masonry>*/}

                 <CommentCard handleDelete={handleDelete}/>

            </Container>

        </Container>
    )
}