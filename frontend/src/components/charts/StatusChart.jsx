import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StatusChart({ stats }) {

  const data = [

    {
      name: "Open",
      value: stats.open_incidents,
    },

    {
      name: "Resolved",
      value: stats.resolved_incidents,
    },

    {
      name: "Critical",
      value: stats.critical_incidents,
    },

  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 h-[350px]">

      <h2 className="text-xl font-semibold mb-5">
        Incident Status
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <BarChart data={data}>

          <XAxis dataKey="name"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="value"
            fill="#06b6d4"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusChart;