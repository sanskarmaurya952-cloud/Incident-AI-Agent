import api from "./axios";

export const getAllLessons = async () => {
  const response = await api.get("/api/lessons");
  return response.data;
};

export const searchLessons = async (keyword) => {
  const response = await api.get(
    `/api/lessons/search?keyword=${keyword}`
  );
  return response.data;
};

export const deleteLesson = async (id) => {
  const response = await api.delete(`/api/lessons/${id}`);
  return response.data;
};