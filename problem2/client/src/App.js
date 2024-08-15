import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './Pages/AllProducts';
import ProductPage from './Pages/ProductPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  </Router>
);

export default App;
