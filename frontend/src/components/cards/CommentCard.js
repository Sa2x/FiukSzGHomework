import React from "react";
import {Card, CardHeader, IconButton, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {makeStyles} from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyle = makeStyles(() => ({
    subheader: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    comment: {
        paddingLeft: "100px"
    }
}));

export default function CommentCard({comment, handleDelete}) {
    const classes = useStyle()

    return (
        <div>
            <Card>
                <CardHeader
                    title={
                        <div className={classes.subheader}>
                            <PersonIcon/>
                            <Typography>{comment.createdBy.email}</Typography>
                            <Typography className={classes.comment}>{comment.comment}</Typography>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton onClick={() => handleDelete(comment.id)} >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    }
                >
                </CardHeader>
            </Card>
        </div>
    )
}