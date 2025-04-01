import { getAllProducts } from '../lib/mockData';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPage() {
  const products = getAllProducts();
  
  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>
      
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