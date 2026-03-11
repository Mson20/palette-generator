import { useState } from "react"

function genererCouleur() {
  const lettres = "0123456789ABCDEF"
  let couleur = "#"
  for (let i = 0; i < 6; i++) {
    couleur += lettres[Math.floor(Math.random() * 16)]
  }
  return couleur
}

function genererPaletteInitiale() {
  return Array.from({ length: 5 }, genererCouleur)
}

function CarteColor({ couleur }) {
  const [copie, setCopie] = useState(false)

  function copierCouleur() {
    navigator.clipboard.writeText(couleur)
    setCopie(true)
    setTimeout(() => setCopie(false), 1500)
  }

  return (
    <div onClick={copierCouleur} style={{
      backgroundColor: couleur,
      flex: 1,
      height: "340px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: "20px",
      cursor: "pointer",
      borderRadius: "12px",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-8px)"
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)"
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "none"
    }}
    >
      <span style={{
        backgroundColor: "white",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "bold",
        letterSpacing: "1px",
      }}>
        {copie ? "✅ Copié !" : couleur.toUpperCase()}
      </span>
    </div>
  )
}

function PaletteFavori({ couleurs }) {
  return (
    <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", height: "50px" }}>
      {couleurs.map((couleur, index) => (
        <div key={index} style={{ backgroundColor: couleur, flex: 1 }} />
      ))}
    </div>
  )
}

function App() {
  const [couleurs, setCouleurs] = useState(genererPaletteInitiale)
  const [favoris, setFavoris] = useState([])

  function genererPalette() {
    setCouleurs(genererPaletteInitiale())
  }

  function ajouterFavori() {
    setFavoris([...favoris, couleurs])
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f0f0f",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "40px",
    }}>
      <h1 style={{
        color: "white",
        fontSize: "2rem",
        marginBottom: "8px",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}>
        🎨 Palette Generator
      </h1>
      <p style={{ color: "#888", marginBottom: "40px", fontSize: "14px" }}>
        Clique sur une couleur pour copier son code
      </p>

      <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "900px" }}>
        {couleurs.map((couleur, index) => (
          <CarteColor key={index} couleur={couleur} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
        <button onClick={genererPalette} style={{
          padding: "14px 36px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "white",
          color: "#0f0f0f",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          letterSpacing: "1px",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          🎲 Générer
        </button>

        <button onClick={ajouterFavori} style={{
          padding: "14px 36px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "transparent",
          color: "white",
          border: "2px solid white",
          borderRadius: "30px",
          cursor: "pointer",
          letterSpacing: "1px",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          🤍 Sauvegarder
        </button>
      </div>

      {favoris.length > 0 && (
        <div style={{ marginTop: "60px", width: "100%", maxWidth: "900px" }}>
          <h2 style={{ color: "white", marginBottom: "20px", letterSpacing: "2px", textTransform: "uppercase", fontSize: "1rem" }}>
            Mes favoris
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {favoris.map((palette, index) => (
              <PaletteFavori key={index} couleurs={palette} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App