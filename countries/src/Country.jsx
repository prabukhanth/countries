import React, { useEffect, useState } from "react";
import styles from "./Country.module.css";

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountry();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(query)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          onChange={handleSearch}
          placeholder="Search country"
          type="search"
          value={searchQuery}
        />
      </div>
      <div className={styles.mainCard}>
        {filteredCountries.map((country, idx) => (
          <div key={idx} className={styles.cardWrapper}>
            <img src={country.flag} alt={country.name} className={styles.cardImg} />
            <h4>{country.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;