// src/pages/CreateCar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../services/api';

const CreateCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    tags: {
      car_type: '',
      company: '',
      dealer: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cars.create(formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating car');
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Car</h1>
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-gray-700">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-700">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
          rows="4"
        />
      </div>

      <div>
        <label className="block mb-2 text-gray-700">Images (Max 10)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-gray-700">Car Type</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.tags.car_type}
            onChange={(e) => setFormData({
              ...formData,
              tags: { ...formData.tags, car_type: e.target.value }
            })}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Company</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.tags.company}
            onChange={(e) => setFormData({
              ...formData,
              tags: { ...formData.tags, company: e.target.value }
            })}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Dealer</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={formData.tags.dealer}
            onChange={(e) => setFormData({
              ...formData,
              tags: { ...formData.tags, dealer: e.target.value }
            })}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Car'}
      </button>
    </form>
  </div>
);
};

export default CreateCar;
