// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data)
};

export const cars = {
  create: (data) => {
    const formData = new FormData();
    data.images.forEach(image => formData.append('images', image));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tags', JSON.stringify(data.tags));
    return api.post('/cars', formData);
  },
  list: (search) => api.get('/cars', { params: { search } }),
  get: (id) => api.get(`/cars/${id}`),
  update: (id, data) => {
    const formData = new FormData();
    if (data.images) {
      data.images.forEach(image => formData.append('images', image));
    }
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tags', JSON.stringify(data.tags));
    return api.put(`/cars/${id}`, formData);
  },
  delete: (id) => api.delete(`/cars/${id}`)
};
export default cars;