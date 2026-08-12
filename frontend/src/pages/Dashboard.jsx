import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/incidentApi";

import StatsCard from "../components/StatsCard";

import SeverityChart from "../components/charts/SeverityChart";
import StatusChart from "../components/charts/StatusChart";

function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!stats) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <h2 className="text-2xl text-white">
          Loading Dashboard...
        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-white">

          🛡️ IncidentPilot AI Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          Real-time Incident Monitoring & AI Analytics

        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Total Incidents"
          value={stats.total_incidents}
          color="text-cyan-400"
        />

        <StatsCard
          title="Open Incidents"
          value={stats.open_incidents}
          color="text-yellow-400"
        />

        <StatsCard
          title="Critical Incidents"
          value={stats.critical_incidents}
          color="text-red-500"
        />

        <StatsCard
          title="Resolved"
          value={stats.resolved_incidents}
          color="text-green-400"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <SeverityChart stats={stats} />

        <StatusChart stats={stats} />

      </div>

    </div>

  );

}

export default Dashboard;