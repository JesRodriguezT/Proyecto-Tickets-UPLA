export default function InputField({ label, name, value, onChange, placeholder, type = "text", required = false }) {
    return (
        <div style={{ marginBottom: "15px" }}>
            <label htmlFor={name} style={{ display: "block", fontWeight: "bold" }}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
        </div>
    );
}