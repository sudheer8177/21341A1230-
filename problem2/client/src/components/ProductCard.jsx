import React from 'react';

const ProductCard = ({ product }) => (
  <div className="p-4 border rounded shadow-custom-light gap-4 hover:shadow-custom-dark hover:bg-gray-100 transition-shadow duration-300">
    <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
    <h2 className="text-xl mt-2 font-semibold">{product.name}</h2>
    <p className="text-gray-600">{product.company}</p>
    <p className="text-lg font-bold">${product.price}</p>
    <p className="text-yellow-500">{product.rating} / 5</p>
    <p className="text-red-500">{product.discount}% off</p>
  </div>
);

export default ProductCard;
