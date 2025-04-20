'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { checkAdminRole } from '../firebase/adminUtils';
import { getAllProducts, updateProductStock } from '../firebase/firebaseUtils';

import Image from 'next/image';
import Swal from 'sweetalert2';
import ProductForm from '../components/ProductForm';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingStock, setEditingStock] = useState(null);

  const [error, setError] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const adminStatus = await checkAdminRole(user.uid);
      if (!adminStatus) {
        Swal.fire({
          title: 'Acceso denegado',
          text: 'No tienes permisos de administrador',
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then(() => {
          router.push('/');
        });
        return;
      }

      setIsAdmin(true);
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleProductAdded = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      Swal.fire({
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error('Error refreshing products:', err);
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>
      
      <div className="admin-section">
        <h2>Agregar Nuevo Producto</h2>
        <ProductForm onSuccess={handleProductAdded} />
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