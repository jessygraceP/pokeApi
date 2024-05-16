import React, { useState } from 'react'; // Import React and useState hook
import './app.css'; // Import CSS for styling
import Main from './Components/Main'; // Import Main component
import './Components/style.css'; // Import additional CSS for styling

function App() {
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Function to toggle dark mode
  };

  return (
    <>
      {/* Container div with dynamic class for light/dark mode */}
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        {/* Div for displaying the PokeAPI image */}
        <div className="Poke">
          <img src={`${process.env.PUBLIC_URL}/pokeapi.png`} alt="PokeAPI" />
        </div>
        {/* Button to toggle light/dark mode */}
        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {/* Main component that displays the Pokemon data */}
        <Main />
      </div>
    </>
  );
}

export default App; // Export the App component
