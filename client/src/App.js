import { Routes, Route} from "react-router-dom";
import React from 'react';
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Update from "./pages/UpdateProducts.jsx"
import Contact from "./pages/Contact.jsx"
import About from "./pages/About.jsx"
import Products from "./pages/Products.jsx"
import Product from "./pages/Product.jsx"
import NotFoundPage from "./pages/NotFound.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<Update />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} >
          <Route path=":productName" element={<ProductDetail/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;