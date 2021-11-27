import React from "react";
// import {Container, Typography} from "@mui/material";
// import Masonry from "react-masonry-css";
import UserCard from "../components/cards/UserCard";
import {useHistory} from "react-router-dom";

export default function UsersPage() {
    const history = useHistory()
    // const [users, setUsers] = useState([])
    //
    // const breakpoints = {
    //     default: 3,
    //     1100: 2,
    //     700: 1,
    // }

    const handleEdit = (id) => {
        history.push({
            pathname: '/user_edit',
            search: '?query=abc',
            state: {
                id: id
            }
        })
    }

    const handleDelete = async (id) => {
        // await fetch('http://localhost:8000/images/' + id, {
        //     method: 'DELETE'
        // })
        //
        // const newImages = images.filter(image => image.id !== id)
        // setImages(newImages)
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
            <UserCard handleEdit={handleEdit}
                      handleDelete={handleDelete}  />
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
        </div>
    );
}