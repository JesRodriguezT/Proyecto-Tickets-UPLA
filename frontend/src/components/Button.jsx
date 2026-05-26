export default function Button({ children, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}