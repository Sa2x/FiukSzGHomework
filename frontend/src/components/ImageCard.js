import {Avatar, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import AddCommentIcon from '@mui/icons-material/AddComment';
import EditIcon from '@mui/icons-material/Edit';
import {makeStyles} from "@mui/styles";

const useStyle = makeStyles(() => ({
    subheader: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
}));

export default function ImageCard({image, handleDelete}) {
    const classes = useStyle();

    return (
        <div>
            <Card>
                <CardHeader
                    title={image.title}
                    subheader={
                        <div>
                            <div className={classes.subheader}>
                                <PersonIcon/>
                                <Typography>{image.created_by}</Typography>
                            </div>
                            <div className={classes.subheader}>
                                <UploadIcon/>
                                <Typography>{image.uploaded_by}</Typography>
                            </div>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton>
                                <AddCommentIcon/>
                            </IconButton>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(image.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    }
                />
                <CardContent>
                    <img src="logo192.png"/>
                </CardContent>
            </Card>
        </div>
    )
}