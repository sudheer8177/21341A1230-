import React, { useEffect, useState } from 'react';
import { dummyProductDetail } from '../data/dummyProductDetail';

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {

    if (productId) {
      setProduct(dummyProductDetail);
    }
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow-custom-light gap-4 hover:shadow-custom-dark transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
      <h1 className="text-3xl mt-4 font-semibold">{product.name}</h1>
      <p className="text-gray-600">{product.company}</p>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <p className="text-yellow-500">{product.rating} / 5</p>
      <p className="text-red-500">{product.discount}% off</p>
      <p>{product.availability ? 'In Stock' : 'Out of Stock'}</p>
      <p className="mt-4 text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
