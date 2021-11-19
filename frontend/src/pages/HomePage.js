import React from "react";
import {Container, Typography} from "@mui/material";
import ImageCard from "../components/ImageCard";
import Masonry from "react-masonry-css";

export default function HomePage() {

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {/*{notes.map(note => (*/}
                {/*    <div key={note.id}>*/}
                {/*        <NoteCard note={note} handleDelete={handleDelete} />*/}
                {/*    </div>*/}
                {/*))}*/}
                <div>
                    <ImageCard/>
                </div>
            </Masonry>
        </Container>
    );
}