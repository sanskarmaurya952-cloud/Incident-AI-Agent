import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/incidentApi";

import StatsCard from "../components/StatsCard";

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

  if (!stats)
    return (
      <div className="text-white">
        Loading...
      </div>
    );

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Security Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <StatsCard
          title="Total"
          value={stats.total_incidents}
        />

        <StatsCard
          title="Open"
          value={stats.open_incidents}
        />

        <StatsCard
          title="Critical"
          value={stats.critical_incidents}
        />

        <StatsCard
          title="Resolved"
          value={stats.resolved_incidents}
        />

      </div>

    </div>

  );
}

export default Dashboard;