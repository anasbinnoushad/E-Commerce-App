function StatCard({ title, value }) {
  return (
    <div className="border rounded p-6 shadow bg-white">
      <h2 className="text-xl text-gray-600">{title}</h2>
      <p className="text-4xl font-bold mt-3">{value}</p>
    </div>
  );
}
export default StatCard;