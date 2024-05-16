import React, { useState, useEffect, useCallback} from "react"; // Import React, useState, useEffect hooks
import Card from "./Card"; // Import Card component
import Pokeinfo from "./Pokeinfo"; // Import Pokeinfo component
import axios from "axios"; // Import axios for API calls

const Main = () => {
    const [pokeData, setPokeData] = useState([]); // State to hold Pokemon data
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [currentPage, setCurrentPage] = useState(0); // State to manage current page
    const [pokeDex, setPokeDex] = useState(null); // State to hold detailed Pokemon data
    const limit = 10; // Number of Pokemon per page

    // Function to fetch Pokemon data from API
    const pokeFun = useCallback(async (offset = 0) => {
        setLoading(true); // Start loading
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            getPokemon(res.data.results); // Fetch detailed data for each Pokemon
        } catch (error) {
            console.error("Error fetching data:", error); // Handle errors
        } finally {
            setLoading(false); // Stop loading
        }
    },[]);

    // Function to get detailed Pokemon data
    const getPokemon = async (res) => {
        const pokemonData = await Promise.all(
            res.map(async (item) => {
                const result = await axios.get(item.url);
                return result.data;
            })
        );
        setPokeData(pokemonData.sort((a, b) => (a.id > b.id ? 1 : -1))); // Sort and set data
    };

    // Fetch data whenever currentPage changes
    useEffect(() => {
        pokeFun(currentPage * limit);
    }, [currentPage, pokeFun]);

    return (
        <div className="container">
            <div className="left-content">
                {loading ? (
                    <h2>Loading...</h2> // Display loading message if loading
                ) : (
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                )}
            </div>
            <div className="right-content">
                <Pokeinfo data={pokeDex} /> {/* Display detailed Pokemon info */}
                <button className="arrow-btn prev-btn" onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                        <path d="M15.41,7.41L14,6l-6,6l6,6l1.41-1.41L10.83,12L15.41,7.41z"/>
                    </svg>
                </button>
                <button className="arrow-btn next-btn" onClick={() => setCurrentPage(prevPage => prevPage + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                        <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Main; // Export the Main component
