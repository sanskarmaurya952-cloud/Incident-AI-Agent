function SeverityBadge({ severity }) {
  const colors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
        colors[severity] || "bg-gray-500"
      }`}
    >
      {severity}
    </span>
  );
}

export default SeverityBadge;