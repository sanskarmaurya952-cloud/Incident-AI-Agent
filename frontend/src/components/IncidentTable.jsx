import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

function IncidentTable({
  incidents,
  onAnalyze,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-sm">

        <thead className="bg-slate-900">

          <tr>

            <th className="text-left p-4">Title</th>

            <th className="text-left p-4">Severity</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">AI</th>

            <th className="text-left p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {incidents.map((incident) => (

            <tr
              key={incident.id}
              className="border-t border-slate-800 hover:bg-slate-900"
            >

              <td className="p-4">

                <div className="font-semibold">

                  {incident.title}

                </div>

                <div className="text-xs text-slate-400">

                  {incident.description}

                </div>

              </td>

              <td className="p-4">

                <SeverityBadge
                  severity={incident.severity}
                />

              </td>

              <td className="p-4">

                <StatusBadge
                  status={incident.status}
                />

              </td>

              <td className="p-4">

                {incident.analysis_status === "Completed"
                  ? "✅ Done"
                  : "⏳ Pending"}

              </td>

              <td className="p-4 flex gap-2">

                <button
                  onClick={() => onAnalyze(incident.id)}
                  className="bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded"
                >
                  Analyze
                </button>

                <select
                  className="bg-slate-800 rounded px-2 py-1"
                  defaultValue={incident.status}
                  onChange={(e) =>
                    onStatusChange(
                      incident.id,
                      e.target.value
                    )
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>

                <button
                  onClick={() => onDelete(incident.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default IncidentTable;