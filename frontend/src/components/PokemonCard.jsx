export default function PokemonCard({ name, image, description }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* Columna izquierda: Imagen y nombre */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "200px",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: "180px",
              height: "180px",
              objectFit: "contain",
            }}
          />
          <h3
            style={{
              textTransform: "capitalize",
              marginTop: "15px",
              fontSize: "24px",
              color: "#333",
            }}
          >
            {name}
          </h3>
        </div>

        {/* Columna derecha: Descripción */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <h4
              style={{
                marginBottom: "10px",
                color: "#666",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Descripción:
            </h4>
            <p
              style={{
                color: "#555",
                lineHeight: "1.6",
                fontSize: "14px",
              }}
            >
              {description || "Sin descripción disponible"}
            </p>
          </div>
        </div>
      </div>

      {/* Descripción adicional abajo */}
      {description && (
        <div
          style={{
            borderTop: "1px solid #eee",
            padding: "15px 20px",
            background: "#f9f9f9",
          }}
        >
          <p
            style={{
              color: "#666",
              lineHeight: "1.6",
              fontSize: "14px",
              margin: 0,
            }}
          >
            <strong>Información adicional:</strong> {description}
          </p>
        </div>
      )}
    </div>
  );
}

