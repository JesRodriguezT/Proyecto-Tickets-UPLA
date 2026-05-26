export default function FormMessage({ type, message }) {
  if (!message) return null;

  return (
    <div
      className={`mt-4 p-3 rounded font-medium border-l-4 ${
        type === "success"
          ? "bg-green-100 text-green-700 border-green-500"
          : "bg-red-100 text-red-700 border-red-500"
      }`}
    >
      {message}
    </div>
  );
}