function StatusBadge({ status }) {
  const colors = {
    Open: "bg-red-500",
    "In Progress": "bg-yellow-500",
    Resolved: "bg-green-600",
    Closed: "bg-slate-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
        colors[status] || "bg-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;