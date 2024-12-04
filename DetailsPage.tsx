import "../styles/App.css";
import { studyspaces } from "../data";
import { useParams } from 'react-router-dom';
import SpaceDetails from "./SpaceDetails";

function DetailsPage() {

    const { id } = useParams();

    const obj = studyspaces.find((o) => o.id.toString() === id);

    if (!obj) {
        return <h1>Study space with ID {id} not found</h1>;
    }

    return (
        <>
            <SpaceDetails id={obj.id} name={obj.name} campus={obj.campus} hall={obj.hall} floor={obj.floor} rating={obj.rating} />
        </>
    );
}

export default DetailsPage;