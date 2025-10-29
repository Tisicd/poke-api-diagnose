export default function PokemonCard({ name, image }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8, textAlign: "center" }}>
      <img src={image} alt={name} width="120" height="120" />
      <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
    </div>
  );
}

