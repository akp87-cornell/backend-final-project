import { useMemo, useState } from "react";
import Paginator from "./Paginator";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import "../styles/App.css";

type Props<T> = {
    data: T[];
    itemsPerPage: number;
};

const Gallery = <T extends { 
    id: number; 
    name: string;
    campus?: string;
    hall?: string;
    floor?: number;
    rating?: number; }>({
        data,
        itemsPerPage,
    }: Props<T>) => {
        
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [campus, setCampus] = useState("All");
    const [hall, setHall] = useState("All");
    const [floor, setFloor] = useState("All");

    const itemsToDisplay: T[] = useMemo(() => {
        const returnData: T[] = [];
        const searchData = search.toLowerCase().trim();
        
        for (let x = 0; x < data.length; x++) {
            const studySpace = data[x].name.toLowerCase().trim();
            console.log(campus)
            if (studySpace.includes(searchData) && 
            (campus === "All" || data[x].campus === campus) &&
            (hall === "All" || data[x].hall === hall) &&
            (floor === "All" || data[x].floor === Number(floor))) {
                returnData.push(data[x]);
            }
        }
        returnData.sort((a, b) => a.name.localeCompare(b.name));
        return returnData.slice((page-1)*itemsPerPage, page*itemsPerPage);
    }, [search, page, itemsPerPage, data, campus, hall, floor]);

    const lastPossiblePage = useMemo(() => {
        let count = 0;
        const searchData = search.toLowerCase().trim();
        for (let x = 0; x < data.length; x++) {
            const studySpace = data[x].name.toLowerCase().trim();
            if (studySpace.includes(searchData)) {
                count++;
            }
        }
        return Math.ceil(count/itemsPerPage);
    }, [search, data, itemsPerPage]);

    const campusOptions: string[] = ["All", "North", "West", "Central", "South"]
    const hallOptions: string[] = ["All", "Barton", "Donlon", "Dickson", "Hu Shih", "RBG"]
    const floorOptions: string[] = ["All", "1", "2", "3", "4", "5"]

    return (
        <>
            <div className="card">
                <div className="dropdown-container">
                    <label>Campus</label>
                    <DropDown elements={campusOptions} onChange={setCampus} />
                </div>
                <div className="dropdown-container">
                    <label>Hall</label>
                    <DropDown elements={hallOptions} onChange={setHall} />
                </div>
                <div className="dropdown-container">
                    <label>Floor</label>
                    <DropDown elements={floorOptions} onChange={setFloor} />
                </div>
            </div>
            
            <input data-testid='search' type='text' placeholder='Search' onChange={e => {setSearch(e.target.value); setPage(1)}} />

            <div>
                {itemsToDisplay.map((item) => (
                    <div>
                        <Link to={"/room/" + item.id}>{item.name}</Link>
                    </div>
                ))}
            </div>

            <Paginator maxLimit={lastPossiblePage} page={page} setPage={setPage} />
        </>
    );
};

export default Gallery;