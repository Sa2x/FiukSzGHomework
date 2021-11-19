import {Avatar, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function ImageCard() {
    return (
        <div>
            <Card>
                <CardHeader
                    title="A vilag legszebb kepe"
                    subheader={
                        <div>
                            <PersonIcon/>
                            <Typography>Sándor a királyunk</Typography>
                        </div>
                    }
                    action={
                        <div>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton>
                                <AddCommentIcon/>
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