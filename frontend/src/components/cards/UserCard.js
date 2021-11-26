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
}));

export default function UserCard({handleEdit, handleDelete}) {
    const classes = useStyle()

    return (
        <div>
            <Card>
                <CardHeader
                    title={
                        <div className={classes.subheader}>
                            <PersonIcon/>
                            <Typography>Sasasasa</Typography>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton>
                                <EditIcon onClick={() => handleEdit(/*user.id*/ 1)}/>
                            </IconButton>
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