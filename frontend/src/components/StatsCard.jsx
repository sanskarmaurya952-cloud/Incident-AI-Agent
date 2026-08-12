function StatsCard({ title, value }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-md border border-slate-800">
      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;