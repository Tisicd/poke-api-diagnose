// Función para obtener el color según el tipo del Pokémon
const getTypeColor = (typeName) => {
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return typeColors[typeName] || "#68A090";
};

// Componente de icono SVG simple
const Icon = ({ type }) => {
  const iconStyle = {
    width: "20px",
    height: "20px",
    marginBottom: "4px",
  };

  switch (type) {
    case "ruler":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 3h18v18H3z" strokeWidth="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeWidth="1" />
        </svg>
      );
    case "sword":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L15 5L12 8L9 5L12 2Z" strokeWidth="2" />
          <path d="M12 8L12 22" strokeWidth="2" />
        </svg>
      );
    case "heart":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case "speed":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 6v6l4 2" strokeWidth="2" />
        </svg>
      );
    case "target":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "star":
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function PokemonCard({
  name,
  image,
  description,
  types = [],
  stats = {},
  abilities = [],
  baseExperience = 0,
  weight = "0.0",
  height = "0.0",
}) {
  // Obtener el color del tipo principal (primer tipo)
  const primaryType = types && types.length > 0 ? types[0].name : "normal";
  const typeColor = getTypeColor(primaryType);

  // Obtener la primera habilidad principal (no oculta)
  const mainAbility =
    abilities && abilities.length > 0
      ? abilities.find((a) => !a.is_hidden) || abilities[0]
      : null;
  const abilityName = mainAbility ? mainAbility.name : "N/A";

  return (
    <div className="card" style={styles.card}>
      {/* Contenedor superior con las dos secciones */}
      <div style={styles.topSection}>
        {/* Sección superior con imagen, nombre y tipos */}
        <div className="card-1" style={{ ...styles.card1, backgroundColor: typeColor }}>
          <img
            src={image}
            alt={name}
            style={styles.pokemonImage}
          />
          <h3 style={styles.pokemonName}>{name}</h3>
          <div style={styles.typeBadges}>
            {types && types.length > 0
              ? types.map((type, index) => (
                  <span
                    key={index}
                    style={{
                      ...styles.typeBadge,
                      backgroundColor: `${getTypeColor(type.name)}CC`,
                    }}
                  >
                    {type.name}
                  </span>
                ))
              : (
                <span
                  style={{
                    ...styles.typeBadge,
                    backgroundColor: `${typeColor}CC`,
                  }}
                >
                  {primaryType}
                </span>
              )}
          </div>
        </div>

        {/* Sección derecha con descripción */}
        <div className="right" style={styles.right}>
          {/* Descripción */}
          {description && (
            <div style={styles.description}>
              <h4 style={styles.descriptionTitle}>Descripción:</h4>
              <p style={styles.descriptionText}>{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Sección inferior con estadísticas */}
      <div style={styles.bottomSection}>
        {/* Estadísticas principales */}
        <div className="card-2" style={styles.card2}>
          <span style={styles.statLabel}>PESO</span>
          <span style={styles.statValue}>{weight} kg</span>
        </div>
        <div className="card-3" style={styles.card3}>
          <span style={styles.statLabel}>ALTURA</span>
          <span style={styles.statValue}>{height} m</span>
        </div>
        <div className="card-3" style={styles.card3}>
          <span style={styles.statLabel}>ATAQUE</span>
          <span style={styles.statValue}>{stats.attack || 0}</span>
        </div>
        <div className="card-3" style={styles.card3}>
          <span style={styles.statLabel}>DEFENSA</span>
          <span style={styles.statValue}>{stats.defense || 0}</span>
        </div>

        {/* Cajas pequeñas inferiores */}
        <div className="bottom" style={styles.bottom}>
          <div className="card-4" style={styles.card4}>
            <Icon type="ruler" />
            <span style={styles.boxLabel}>ALTURA</span>
            <span style={styles.boxValue}>{height} m</span>
          </div>
          <div className="card-4" style={styles.card4}>
            <Icon type="target" />
            <span style={styles.boxLabel}>EXP</span>
            <span style={styles.boxValue}>{baseExperience || 0}</span>
          </div>
          <div className="card-4" style={styles.card4}>
            <Icon type="star" />
            <span style={styles.boxLabel}>HABILIDADES</span>
            <span style={styles.boxValue}>{abilityName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    width: "100%",
    height: "100%",
    minHeight: "auto",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
  },
  card1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 10px",
    minWidth: "140px",
    flexShrink: 0,
    color: "white",
  },
  pokemonImage: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    marginBottom: "8px",
    imageRendering: "pixelated",
  },
  pokemonName: {
    textTransform: "capitalize",
    margin: "5px 0",
    fontSize: "15px",
    fontWeight: "bold",
    color: "white",
  },
  typeBadges: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },
  typeBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    background: "white",
    minWidth: 0,
    overflow: "hidden",
  },
  bottomSection: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    background: "white",
    borderTop: "1px solid #f0f0f0",
    flexShrink: 0,
  },
  description: {
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #f0f0f0",
    flex: 1,
    overflow: "auto",
    minHeight: 0,
  },
  descriptionTitle: {
    marginBottom: "6px",
    color: "#666",
    fontSize: "12px",
    fontWeight: "600",
    margin: "0 0 6px 0",
  },
  descriptionText: {
    color: "#555",
    lineHeight: "1.5",
    fontSize: "11px",
    margin: 0,
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  card2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: "1px solid #f0f0f0",
    marginBottom: "6px",
  },
  card3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 0",
    borderBottom: "1px solid #f0f0f0",
    marginBottom: "6px",
  },
  statLabel: {
    color: "#999",
    fontSize: "11px",
    fontWeight: "500",
  },
  statValue: {
    color: "#333",
    fontSize: "13px",
    fontWeight: "bold",
  },
  bottom: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #f0f0f0",
  },
  card4: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 6px",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    background: "white",
    minHeight: "70px",
  },
  boxLabel: {
    fontSize: "9px",
    color: "#999",
    marginTop: "3px",
    textAlign: "center",
  },
  boxValue: {
    fontSize: "10px",
    color: "#333",
    fontWeight: "600",
    marginTop: "3px",
    textAlign: "center",
    textTransform: "capitalize",
  },
};
