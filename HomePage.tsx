import "../styles/App.css";
import Gallery from "./Gallery";
import { studyspaces } from "../data";

function Homepage() {
    return (
        <>
            <h1>Top Study Spots @ Cornell</h1>
            <Gallery itemsPerPage={5} data={studyspaces} />
        </>
    );
}

export default Homepage;
