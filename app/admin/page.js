'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadProductsOneByOne, uploadProductsInBatch } from '../firebase/config';
import { getAllProducts } from '../firebase/firebaseUtils';
import './admin.css';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleUpload = async (method) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      if (method === 'one-by-one') {
        await uploadProductsOneByOne();
      } else {
        await uploadProductsInBatch();
      }
      setResult('Productos cargados correctamente');
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>
      
      <div className="admin-upload-section">
        <h2>Cargar Productos a Firebase</h2>
        <p>Utiliza uno de estos botones para cargar los productos de muestra a tu base de datos:</p>
        
        <div className="upload-buttons">
          <button 
            className="btn-primary" 
            onClick={() => handleUpload('batch')}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar Productos en Lote'}
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={() => handleUpload('one-by-one')}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar Productos Uno por Uno'}
          </button>
        </div>
        
        {result && (
          <div className="upload-success">
            <p>{result}</p>
          </div>
        )}
        
        {error && (
          <div className="upload-error">
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      <div className="admin-header">
        <button className="btn-primary">
          Agregar nuevo producto
        </button>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="admin-search"
          />
          <button className="btn-search">Buscar</button>
        </div>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={50} 
                    height={50}
                    className="admin-product-img" 
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="admin-actions">
                  <button className="btn-edit">Editar</button>
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="admin-pagination">
        <button className="btn-page">Anterior</button>
        <span className="page-indicator">Página 1 de 3</span>
        <button className="btn-page">Siguiente</button>
      </div>
    </div>
  );
}