import {Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
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

export default function ImageCard({image, handleComment, handleEdit, handleDelete}) {
    const classes = useStyle();

    return (
        <div>
            <Card>
                <CardHeader
                    title={image.name}
                    subheader={
                        <div>
                            <div className={classes.subheader}>
                                <PersonIcon/>
                                <Typography>{image.createdBy}</Typography>
                            </div>
                            <div className={classes.subheader}>
                                <UploadIcon/>
                                <Typography>{image.uploadedBy.email}</Typography>
                            </div>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton onClick={() => handleComment(image)}>
                                <AddCommentIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleEdit(image)}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(image.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    }
                />
                <CardContent>
                    <img src={image.ciffList.img} alt="Logo" />
                </CardContent>
            </Card>
        </div>
    )
}