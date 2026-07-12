export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Sistema ConstruSoft Ticket
        </h1>
        <p className="text-sm text-gray-500">
          Gestión de incidencias técnicas
        </p>
      </div>
      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        SPA v1.0
      </div>
    </header>
  );
}