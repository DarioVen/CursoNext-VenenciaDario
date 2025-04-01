import { getAllProducts } from '../lib/mockData';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const products = getAllProducts();
  
  return (
    <div className="products-page">
      <h1>Catálogo de Productos</h1>
      
      <div className="filters">
        <select className="filter-select">
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre: A-Z</option>
        </select>
        
        <select className="filter-select">
          <option value="">Categoría</option>
          <option value="electronics">Electrónica</option>
          <option value="clothing">Ropa</option>
          <option value="home">Hogar</option>
        </select>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}