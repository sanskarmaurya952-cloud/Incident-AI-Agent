import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import IncidentTable from "../components/IncidentTable";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import AnalysisModal from "../components/modals/AnalysisModal";

import {
  getAllIncidents,
  analyzeIncident,
  deleteIncident,
  updateIncidentStatus,
} from "../api/incidentApi";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // Analysis Modal
  // ==========================

  const [modalOpen, setModalOpen] = useState(false);

  const [memoryUsed, setMemoryUsed] = useState(false);

  const [analysis, setAnalysis] = useState({
    summary: "",
    root_cause: "",
    recommended_action: [],
    prevention: [],
    confidence: 0,
  });

  // ==========================
  // Load Incidents
  // ==========================

  const loadIncidents = async () => {
    try {
      setLoading(true);

      const data = await getAllIncidents();

      setIncidents(data);
      setFilteredIncidents(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  // ==========================
  // Search
  // ==========================

  useEffect(() => {
    const result = incidents.filter((incident) =>
      incident.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredIncidents(result);
  }, [search, incidents]);

  // ==========================
  // Analyze
  // ==========================

  const handleAnalyze = async (id) => {
    try {
      const response = await analyzeIncident(id);

      setAnalysis(response.analysis);

      setMemoryUsed(response.memory_used);

      setModalOpen(true);

      toast.success("AI Analysis Completed");

      await loadIncidents();
    } catch (error) {
      console.error(error);
      toast.error("Analysis Failed");
    }
  };

  // ==========================
  // Delete
  // ==========================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this incident?")) return;

    try {
      await deleteIncident(id);

      toast.success("Incident Deleted Successfully");

      loadIncidents();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  // ==========================
  // Status Update
  // ==========================

  const handleStatusChange = async (id, status) => {
    try {
      await updateIncidentStatus(id, status);

      toast.success("Status Updated");

      loadIncidents();
    } catch (error) {
      console.error(error);
      toast.error("Status Update Failed");
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Incidents
          </h1>

          <input
            type="text"
            placeholder="Search Incident..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {loading ? (
          <Loading />
        ) : filteredIncidents.length === 0 ? (
          <EmptyState />
        ) : (
          <IncidentTable
            incidents={filteredIncidents}
            onAnalyze={handleAnalyze}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <AnalysisModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        analysis={analysis}
        memoryUsed={memoryUsed}
      />
    </>
  );
}

export default Incidents;