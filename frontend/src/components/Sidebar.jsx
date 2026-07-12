export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">ConstruSoft</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left hover:text-blue-300 transition">
              Registro de Tickets
            </button>
          </li>
          <li>
            <button className="w-full text-left text-gray-400">
              Próximamente...
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}