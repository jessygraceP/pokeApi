import React, { useState } from "react"; // Import React and useState hook

const Card = ({ pokemon, loading, infoPokemon }) => {
    const [likedPokemons, setLikedPokemons] = useState([]); // State to manage liked Pokemons

    // Function to toggle liked state of a Pokemon
    const toggleLike = (id) => {
        if (likedPokemons.includes(id)) {
            setLikedPokemons(likedPokemons.filter((likedId) => likedId !== id)); // Remove from liked
        } else {
            setLikedPokemons([...likedPokemons, id]); // Add to liked
        }
    };

    // Check if a Pokemon is liked
    const isLiked = (id) => {
        return likedPokemons.includes(id);
    };

    return (
        <>
            {loading ? (
                <h1>Loading...</h1> // Display loading message if loading
            ) : (
                pokemon.map((item) => (
                    <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
                        <h2>{item.id}</h2>
                        <img src={item.sprites.front_default} alt="" />
                        <h2>{item.name}</h2>
                        <div>
                            <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} className={isLiked(item.id) ? "active" : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="feather feather-heart">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Card; // Export the Card component
