export default function PageContainer({ title, children }) {
  return (
    <section className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}