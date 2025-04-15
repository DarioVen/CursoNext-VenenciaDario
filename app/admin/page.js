'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadProductsOneByOne, uploadProductsInBatch } from '../firebase/config';
import { getAllProducts } from '../firebase/firebaseUtils';
import './admin.css';
import { updateProductStock } from '../firebase/firebaseUtils';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
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

  const handleStockUpdate = async (productId, newStock, variantId = null) => {
    try {
      setLoading(true);
      await updateProductStock(productId, newStock, variantId);
      
      // Update local state
      setProducts(products.map(product => {
        if (product.id === productId) {
          if (variantId) {
            return {
              ...product,
              variants: product.variants?.map(variant => 
                variant.id === variantId 
                  ? { ...variant, stock: newStock }
                  : variant
              )
            };
          }
          return { ...product, stock: newStock };
        }
        return product;
      }));
      
      setEditingStock(null);
    } catch (error) {
      console.error('Error updating stock:', error);
      setError('Error al actualizar el stock');
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
              <React.Fragment key={product.id}>
                <tr>
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
                  <td>
                    {editingStock === product.id ? (
                      <div className="stock-editor">
                        <input
                          type="number"
                          min="0"
                          defaultValue={product.stock}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleStockUpdate(product.id, parseInt(e.target.value));
                            }
                          }}
                        />
                        <button 
                          className="btn-save"
                          onClick={() => setEditingStock(null)}
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => setEditingStock(product.id)}>
                        {product.stock}
                      </span>
                    )}
                  </td>
                  <td className="admin-actions">
                    <button className="btn-edit">Editar</button>
                    <button className="btn-delete">Eliminar</button>
                  </td>
                </tr>
                {product.variants && (
                  <tr key={`${product.id}-variants`}>
                    <td colSpan="7">
                      <div className="variants-table">
                        <h4>Variantes</h4>
                        {product.variants.map(variant => (
                          <div key={`${product.id}-${variant.id}`} className="variant-item">
                            <span>{variant.name}</span>
                            <div className="variant-stock">
                              {editingStock === `${product.id}-${variant.id}` ? (
                                <div className="stock-editor">
                                  <input
                                    type="number"
                                    min="0"
                                    defaultValue={variant.stock}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleStockUpdate(
                                          product.id,
                                          parseInt(e.target.value),
                                          variant.id
                                        );
                                      }
                                    }}
                                  />
                                  <button 
                                    className="btn-save"
                                    onClick={() => setEditingStock(null)}
                                  >
                                    ✓
                                  </button>
                                </div>
                              ) : (
                                <span 
                                  onClick={() => 
                                    setEditingStock(`${product.id}-${variant.id}`)
                                  }
                                >
                                  Stock: {variant.stock}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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