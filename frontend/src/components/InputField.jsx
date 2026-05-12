export default function InputField({ label, name, value, onChange, placeholder, type = "text", error }) {
    return (
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ fontWeight: "bold", display: "block" }}>{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                style={{ 
                    width: "100%", 
                    padding: "8px", 
                    border: error ? "2px solid red" : "1px solid #ccc",
                    borderRadius: "4px"
                }}
            />
            {/* Si hay un error, lo mostramos aquí en rojo */}
            {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
        </div>
    );
}