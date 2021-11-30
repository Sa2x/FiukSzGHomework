import React from "react";
import {Card, CardHeader, IconButton, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {makeStyles} from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
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

export default function CommentCard({handleDelete}) {
    const classes = useStyle()

    return (
        <div>
            <Card>
                <CardHeader
                    title={
                        <div className={classes.subheader}>
                            <PersonIcon/>
                            <Typography>Sasasasa</Typography>
                            <Typography className={classes.comment}>Imádom ezt a képet!</Typography>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton onClick={() => handleDelete(/*user.id*/ 1)} >
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