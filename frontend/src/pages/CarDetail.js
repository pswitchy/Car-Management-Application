import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { cars } from '../services/api';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data } = await cars.get(id);
      setCar(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching car details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await cars.delete(id);
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.message || 'Error deleting car');
      }
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!car) return <div className="container mx-auto p-4">Car not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white shadow-lg rounded-lg">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">{car.title}</h1>
        <div className="space-x-4">
          <Link
            to={`/cars/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={car.images[currentImage]}
            alt={`${car.title} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentImage === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {car.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                currentImage === index ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <img
                src={image}
                alt={`${car.title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(car.tags).map(([key, value]) => (
              <span
                key={key}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {key}: {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
