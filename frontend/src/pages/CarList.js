import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../services/api';

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const { data } = await cars.list(search);
      setCarList(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Cars</h1>
        <Link
          to="/cars/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add New Car
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full px-4 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carList.map((car) => (
            <Link
              key={car._id}
              to={`/cars/${car._id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{car.title}</h2>
                <p className="text-gray-600 line-clamp-2">{car.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(car.tags).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
