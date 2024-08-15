import React, { useState, useEffect } from 'react';
import { dummyProducts } from '../data/dummyProducts';
import ProductCard from './ProductCard';

const ProductList = ({ filters, sorting }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

 
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 100000);

  useEffect(() => {
   
    setProducts(dummyProducts);
  }, [filters, sorting]);

  useEffect(() => {
   
    const filtered = products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
 
    if (sorting) {
      filtered.sort((a, b) => {
        if (!a[sorting.key] || !b[sorting.key]) return 0;
        if (sorting.order === 'desc') {
          return b[sorting.key] - a[sorting.key];
        }
        return a[sorting.key] - b[sorting.key];
      });
    }
    
    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice, sorting]);

  return (
    <div className="m-10">
      <div className="flex flex-col md:flex-row mb-4">
        <div className="mb-4 md:mb-0 md:mr-4">
          <label htmlFor="minPrice" className="block text-gray-700">Min Price</label>
          <input 
            type="number" 
            id="minPrice" 
            value={minPrice} 
            onChange={(e) => setMinPrice(Number(e.target.value))} 
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-gray-700">Max Price</label>
          <input 
            type="number" 
            id="maxPrice" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))} 
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
