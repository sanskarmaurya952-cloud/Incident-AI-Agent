import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    setLoading(true);

    try {

      await createIncident(formData);

      alert("Incident Created Successfully");

      navigate("/incidents");

    } catch (error) {

      console.error(error);

      alert("Failed to create incident");

    }

    setLoading(false);

  };

  return (

    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-8">

        Create Incident

      </h1>

      <form

        onSubmit={handleSubmit}

        className="bg-slate-900 rounded-xl p-8 space-y-6"

      >

        <div>

          <label className="block mb-2">

            Title

          </label>

          <input

            type="text"

            name="title"

            value={formData.title}

            onChange={handleChange}

            required

            className="w-full rounded-lg bg-slate-800 p-3"

          />

        </div>

        <div>

          <label className="block mb-2">

            Description

          </label>

          <textarea

            rows="6"

            name="description"

            value={formData.description}

            onChange={handleChange}

            required

            className="w-full rounded-lg bg-slate-800 p-3"

          />

        </div>

        <div>

          <label className="block mb-2">

            Severity

          </label>

          <select

            name="severity"

            value={formData.severity}

            onChange={handleChange}

            className="w-full rounded-lg bg-slate-800 p-3"

          >

            <option>Low</option>

            <option>Medium</option>

            <option>High</option>

            <option>Critical</option>

          </select>

        </div>

        <button

          disabled={loading}

          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg"

        >

          {loading ? "Creating..." : "Create Incident"}

        </button>

      </form>

    </div>

  );

}

export default CreateIncident;