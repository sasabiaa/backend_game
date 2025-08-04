import React from "react";
import mapboxgl from "mapbox-gl"
import { useNavigate } from "react-router-dom"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Searchbar = ({ onSearch }) => {
    // local store
    const [ searchValue, setSearchValue ] = React.useState();
    const navigate = useNavigate();

    // input handling
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value)

        if (onSearch) {
            onSearch(value);
        }
    };

    // submit handling
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSearch && searchValue.trim()) {
            onSearch(searchValue.trim());
        }

        navigate(`/map?city=${encodeURIComponent(searchValue.trim())}`);
    };

    return(
        <div className="w-[60%] mx-auto justify-center border-2 border-black items-center rounded-3xl">
            <form onSubmit={handleSubmit}>
                <input 
                className="w-full p-4 rounded-xl text-black"
                placeholder="Cari kota"
                onChange={handleInputChange}
                type="text" />
            </form>
        </div>
    )
}

export default Searchbar;