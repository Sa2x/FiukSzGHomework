import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import Masonry from "react-masonry-css";
import UserCard from "../components/cards/UserCard";

export default function UsersPage() {
    const [users, setUsers] = useState([])

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    return (
        // <Container>
        //     <Masonry
        //         breakpointCols={breakpoints}
        //         className="my-masonry-grid"
        //         columnClassName="my-masonry-grid_column" >
        //         {users.map(user => (
        //             <div key={user.id}>
        //                 <UserCard user={user}/>
        //             </div>
        //             ))}
        //     </Masonry>
        // </Container>

        <div>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
        </div>
    );
}