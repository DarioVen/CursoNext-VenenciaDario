'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';

export default function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    discount: '0',
    features: ['']
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount),
        features: formData.features.filter(f => f.trim() !== '')
      };

      await addDoc(collection(db, 'products'), productData);
      
      Swal.fire({
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        discount: '0',
        features: ['']
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar el producto',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Nombre del Producto</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="electronics">Electrónicos</option>
          <option value="clothing">Ropa</option>
          <option value="books">Libros</option>
          <option value="home">Hogar</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="discount">Descuento (%)</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">URL de la Imagen</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Características</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="feature-input">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder="Característica del producto"
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="btn-remove"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="btn-add-feature"
        >
          + Agregar característica
        </button>
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? 'Agregando...' : 'Agregar Producto'}
      </button>
    </form>
  );
}