import api from "./axios";

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get("/api/incidents/stats");
  return response.data;
};

// Incidents
export const getAllIncidents = async () => {
  const response = await api.get("/api/incidents");
  return response.data;
};

export const getIncidentById = async (id) => {
  const response = await api.get(`/api/incidents/${id}`);
  return response.data;
};

export const createIncident = async (data) => {
  const response = await api.post("/api/incidents", data);
  return response.data;
};

export const analyzeIncident = async (id) => {
  const response = await api.post(`/api/incidents/${id}/analyze`);
  return response.data;
};

export const updateIncidentStatus = async (id, status) => {
  const response = await api.put(
    `/api/incidents/${id}/status/${status}`
  );
  return response.data;
};

export const deleteIncident = async (id) => {
  const response = await api.delete(`/api/incidents/${id}`);
  return response.data;
};