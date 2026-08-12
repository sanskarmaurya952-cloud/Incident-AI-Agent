import { useEffect, useState } from "react";
import { getAllIncidents } from "../api/incidentApi";

function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const data = await getAllIncidents();
      setIncidents(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Incidents</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700 rounded-lg">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Severity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-700 hover:bg-slate-800"
              >
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.severity}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Incidents;