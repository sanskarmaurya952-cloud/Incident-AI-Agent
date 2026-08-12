import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createIncident } from "../api/incidentApi";

function CreateIncident() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "Medium",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warning("Please enter an incident title");
      return;
    }

    if (!formData.description.trim()) {
      toast.warning("Please enter an incident description");
      return;
    }

    setLoading(true);

    try {
      await createIncident(formData);

      toast.success("Incident Created Successfully");

      navigate("/incidents");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Create Incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Create Incident
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 shadow-lg"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter incident title..."
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Description
          </label>

          <textarea
            rows="6"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the incident..."
            required
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block mb-2 font-medium text-slate-300">
            Severity
          </label>

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {loading ? "Creating Incident..." : "Create Incident"}
        </button>
      </form>
    </div>
  );
}

export default CreateIncident;