 "use client"

import { useState, useEffect } from "react"

 
interface Country {
  name: string
  population: number
  region: string
  capital: string
  flag: string
  code: string
}

function App() {
  // All our app's data and state
  const [countries, setCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)

  // Get countries from API when app starts
  useEffect(() => {
    fetchCountries()
  }, [])

  // Function to get countries from API
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca2",
      )
      const data = await response.json()

      // Transform API data to our format
      const formattedCountries: Country[] = data.map((country: any) => ({
        name: country.name?.common || "Unknown",
        population: country.population || 0,
        region: country.region || "Unknown",
        capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || "N/A",
        flag: country.flags?.svg || "/placeholder.svg",
        code: country.cca2?.toLowerCase() || "",
      }))

      setCountries(formattedCountries)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching countries:", error)
      setLoading(false)
    }
  }

  // Filter countries based on search and region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || country.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  // Format population numbers with commas
  const formatPopulation = (population: number) => {
    return population.toLocaleString()
  }

  // Define all styles as objects (inline styling approach)
  const styles = {
    // Main app container
    app: {
      minHeight: "100vh",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: darkMode ? "#1a202c" : "#f7fafc",
      color: darkMode ? "white" : "#2d3748",
      transition: "all 0.3s ease",
    },

    // Header styles
    header: {
      padding: "1.5rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: darkMode ? "#2d3748" : "white",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },

    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: 0,
    },

    // Theme toggle button
    themeToggle: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      color: darkMode ? "white" : "#2d3748",
      transition: "background-color 0.2s ease",
    },

    // Main content area
    main: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem",
    },

    // Controls section (search and filter)
    controls: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
      marginBottom: "2rem",
    },

    controlsDesktop: {
      display: "flex",
      flexDirection: "row" as const,
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },

    // Search box
    searchBox: {
      position: "relative" as const,
      flex: 1,
      maxWidth: "400px",
    },

    searchIcon: {
      position: "absolute" as const,
      left: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#a0aec0",
    },

    searchInput: {
      width: "100%",
      padding: "1rem 1rem 1rem 3rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      borderColor: darkMode ? "#4a5568" : "#e2e8f0",
      fontSize: "1rem",
      backgroundColor: darkMode ? "#2d3748" : "white",
      color: darkMode ? "white" : "#2d3748",
      transition: "all 0.2s ease",
    },

    // Region filter dropdown
    regionFilter: {
      minWidth: "200px",
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      borderColor: darkMode ? "#4a5568" : "#e2e8f0",
      fontSize: "1rem",
      cursor: "pointer",
      backgroundColor: darkMode ? "#2d3748" : "white",
      color: darkMode ? "white" : "#2d3748",
      transition: "all 0.2s ease",
    },

    // Countries grid
    countriesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "2rem",
    },

    // Individual country card
    countryCard: {
      borderRadius: "0.5rem",
      overflow: "hidden",
      backgroundColor: darkMode ? "#2d3748" : "white",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },

    // Flag container
    flagContainer: {
      width: "100%",
      height: "200px",
      overflow: "hidden",
    },

    flag: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      transition: "transform 0.3s ease",
    },

    // Country information
    countryInfo: {
      padding: "1.5rem",
    },

    countryName: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      margin: 0,
    },

    countryDetails: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.25rem",
    },

    detailText: {
      fontSize: "0.9rem",
      margin: 0,
      color: darkMode ? "#e2e8f0" : "#4a5568",
    },

    // No results message
    noResults: {
      gridColumn: "1 / -1",
      textAlign: "center" as const,
      padding: "4rem 2rem",
      color: "#a0aec0",
    },

    noResultsIcon: {
      fontSize: "4rem",
      marginBottom: "1rem",
    },

    // Loading spinner
    loading: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "1rem",
    },

    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #3182ce",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  }

  // Show loading while data loads
  if (loading) {
    return (
      <div style={styles.app}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading countries...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.app}>
      {/* Header with title and theme toggle */}
      <header style={styles.header}>
        <h1 style={styles.title}>Where in the world?</h1>
        <button
          style={styles.themeToggle}
          onClick={() => setDarkMode(!darkMode)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = darkMode ? "#4a5568" : "#edf2f7"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <span>{darkMode ? "☀️" : "🌙"}</span>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Main content area */}
      <main style={styles.main}>
        {/* Search and Filter Section */}
        <div style={window.innerWidth > 768 ? styles.controlsDesktop : styles.controls}>
          {/* Search Input */}
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3182ce"
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(49, 130, 206, 0.1)"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = darkMode ? "#4a5568" : "#e2e8f0"
                e.currentTarget.style.boxShadow = "none"
              }}
            />
          </div>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={styles.regionFilter}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#3182ce"
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(49, 130, 206, 0.1)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = darkMode ? "#4a5568" : "#e2e8f0"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <option value="all">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Countries Grid */}
        <div style={styles.countriesGrid}>
          {filteredCountries.length === 0 ? (
            // Show when no countries found
            <div style={styles.noResults}>
              <div style={styles.noResultsIcon}>🌍</div>
              <h3>No countries found</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          ) : (
            // Show country cards
            filteredCountries.map((country) => (
              <div
                key={country.code}
                style={styles.countryCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
                  const flag = e.currentTarget.querySelector("img") as HTMLImageElement
                  if (flag) flag.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                  const flag = e.currentTarget.querySelector("img") as HTMLImageElement
                  if (flag) flag.style.transform = "scale(1)"
                }}
              >
                {/* Country Flag */}
                <div style={styles.flagContainer}>
                  <img
                    src={country.flag || "/placeholder.svg"}
                    alt={`Flag of ${country.name}`}
                    style={styles.flag}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "https://via.placeholder.com/240x160?text=No+Flag"
                    }}
                  />
                </div>

                {/* Country Info */}
                <div style={styles.countryInfo}>
                  <h3 style={styles.countryName}>{country.name}</h3>
                  <div style={styles.countryDetails}>
                    <p style={styles.detailText}>
                      <strong>Population:</strong> {formatPopulation(country.population)}
                    </p>
                    <p style={styles.detailText}>
                      <strong>Region:</strong> {country.region}
                    </p>
                    <p style={styles.detailText}>
                      <strong>Capital:</strong> {country.capital}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        
        @media (max-width: 768px) {
          .controls {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App
