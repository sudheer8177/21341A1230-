import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const AllProducts = () => {
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState('price');

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl">Top Products</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
       
          
        </div>
        <ProductList filters={filters} sorting={sorting} />
      </div>
    </div>
  );
};

export default AllProducts;
