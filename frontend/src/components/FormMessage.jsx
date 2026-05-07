export default function FormMessage({ type, message }) {
    if (!message) return null;
    const color = type === "success" ? "green" : "red";
    return (
        <p style={{ color: color, fontWeight: "bold", marginTop: "10px" }}>
            {type === "success" ? "✅ " : "❌ "} {message}
        </p>
    );
}