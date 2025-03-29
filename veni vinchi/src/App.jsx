import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://api.thedogapi.com/v1/images/search?has_breeds=true";

function App() {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [banList, setBanList] = useState([]);

  const API_KEY = process.env.REACT_APP_DOG_API_KEY; // Secure API Key

  const fetchDog = async () => {
    setLoading(true);
    setError("");

    try {
      let response, dogData;
      
      do {
        response = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });

        const data = await response.json();

        if (data.length > 0) {
          dogData = data[0];

          if (!banList.includes(dogData.breeds[0]?.name)) {
            setDog(dogData);
            setLoading(false);
            return;
          }
        }
      } while (true);
    } catch (error) {
      setError("No dog found. Try again!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  const handleBan = (breed) => {
    if (banList.includes(breed)) {
      setBanList(banList.filter((b) => b !== breed));
    } else {
      setBanList([...banList, breed]);
    }
  };

  return (
    <div className="container">
      <h1>🐶 Discover Something New! 🎲</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {dog && (
        <div className="dog-card">
          <img src={dog.url} alt="Random Dog" className="dog-image" />
          <h2 onClick={() => handleBan(dog.breeds[0]?.name)}>
            {dog.breeds[0]?.name || "Unknown Breed"}
          </h2>
          <p>Temperament: {dog.breeds[0]?.temperament || "Unknown"}</p>
          <p>Origin: {dog.breeds[0]?.origin || "Unknown"}</p>
        </div>
      )}

      <button onClick={fetchDog}>Discover Another</button>

      <h3>Banned Breeds:</h3>
      <ul className="ban-list">
        {banList.map((breed, index) => (
          <li key={index} onClick={() => handleBan(breed)}>
            ❌ {breed}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
