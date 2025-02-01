// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as styles from './styles/App.module.scss';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetailPage from './pages/ProductDetailPage';
import { ToastContainer } from 'react-toastify';

const App = () => (
  <>
    <Header/>
    <section className={styles.ml__centered}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>
      <ToastContainer />
    </section>
  </>
);

export default App;
