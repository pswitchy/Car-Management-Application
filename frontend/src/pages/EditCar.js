// src/pages/EditCar.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../services/api';

const EditCar = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data } = await cars.get(id);
      setFormData({
        title: data.title,
        description: data.description,
        images: data.images,
        tags: data.tags
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching car details');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    setNewImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = { ...formData };
      if (newImages.length > 0) {
        updateData.images = newImages;
      }
      await cars.update(id, updateData);
      navigate(`/cars/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating car');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-2">Current Images</label>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Current ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              </div>
            ))}
          </div>

          <label className="block mb-2">Upload New Images (Optional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Car Type</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={formData.tags.car_type}
              onChange={(e) => setFormData({
                ...formData,
                tags: { ...formData.tags, car_type: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Company</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={formData.tags.company}
              onChange={(e) => setFormData({
                ...formData,
                tags: { ...formData.tags, company: e.target.value }
              })}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Dealer</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
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
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Car'}
        </button>
      </form>
    </div>
  );
};
export default EditCar;