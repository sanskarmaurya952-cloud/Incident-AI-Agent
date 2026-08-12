import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
];

function SeverityChart({ stats }) {
  const data = [
    {
      name: "Critical",
      value: stats.critical_incidents,
    },
    {
      name: "Open",
      value: stats.open_incidents,
    },
    {
      name: "Resolved",
      value: stats.resolved_incidents,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 h-[350px]">
      <h2 className="text-xl font-semibold mb-5">
        Severity Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            outerRadius={110}
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SeverityChart;