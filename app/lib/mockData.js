export const products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    category: 'electronics',
    price: 599.99,
    discount: 10,
    stock: 15,
    image: '/images/products/smartphone.jpg',
    gallery: [
      '/images/products/smartphone-1.jpg',
      '/images/products/smartphone-2.jpg',
      '/images/products/smartphone-3.jpg'
    ],
    description: 'Un smartphone de última generación con características avanzadas y gran rendimiento.',
    features: [
      'Pantalla OLED de 6.5"',
      'Cámara de 48MP',
      'Procesador Octa-core',
      'Batería de 4500mAh',
      '128GB de almacenamiento'
    ]
  },
  {
    id: 2,
    name: 'Laptop Pro',
    category: 'electronics',
    price: 1299.99,
    discount: 0,
    stock: 8,
    image: '/images/products/laptop.jpg',
    gallery: [
      '/images/products/laptop-1.jpg',
      '/images/products/laptop-2.jpg',
      '/images/products/laptop-3.jpg'
    ],
    description: 'Laptop profesional con alto rendimiento para tareas exigentes y diseño elegante.',
    features: [
      'Procesador Intel i7',
      'RAM 16GB',
      'SSD 512GB',
      'Pantalla 15.6" Full HD',
      'Tarjeta gráfica dedicada'
    ]
  },
  {
    id: 3,
    name: 'Auriculares Inalámbricos',
    category: 'electronics',
    price: 129.99,
    discount: 15,
    stock: 25,
    image: '/images/products/headphones.jpg',
    gallery: [
      '/images/products/headphones-1.jpg',
      '/images/products/headphones-2.jpg',
      '/images/products/headphones-3.jpg'
    ],
    description: 'Auriculares con cancelación de ruido y sonido de alta calidad para una experiencia inmersiva.',
    features: [
      'Cancelación activa de ruido',
      'Bluetooth 5.0',
      'Batería de 30 horas',
      'Micrófono incorporado',
      'Control táctil'
    ]
  },
  {
    id: 4,
    name: 'Camiseta Casual',
    category: 'clothing',
    price: 24.99,
    discount: 0,
    stock: 50,
    image: '/images/products/tshirt.jpg',
    gallery: [
      '/images/products/tshirt-1.jpg',
      '/images/products/tshirt-2.jpg',
      '/images/products/tshirt-3.jpg'
    ],
    description: 'Camiseta de algodón 100% con diseño moderno y cómodo para uso diario.',
    features: [
      'Algodón 100%',
      'Disponible en varios colores',
      'Tallas S a XXL',
      'Lavable a máquina',
      'Diseño exclusivo'
    ]
  },
  {
    id: 5,
    name: 'Zapatillas Deportivas',
    category: 'clothing',
    price: 89.99,
    discount: 5,
    stock: 20,
    image: '/images/products/sneakers.jpg',
    gallery: [
      '/images/products/sneakers-1.jpg',
      '/images/products/sneakers-2.jpg',
      '/images/products/sneakers-3.jpg'
    ],
    description: 'Zapatillas cómodas y duraderas para actividades deportivas o uso casual.',
    features: [
      'Material transpirable',
      'Suela de goma',
      'Disponible en varios colores',
      'Tallas 36-45',
      'Amortiguación avanzada'
    ]
  },
  {
    id: 6,
    name: 'Lámpara de Mesa',
    category: 'home',
    price: 49.99,
    discount: 0,
    stock: 15,
    image: '/images/products/lamp.jpg',
    gallery: [
      '/images/products/lamp-1.jpg',
      '/images/products/lamp-2.jpg',
      '/images/products/lamp-3.jpg'
    ],
    description: 'Lámpara de mesa moderna con iluminación LED ajustable para crear ambiente en tu hogar.',
    features: [
      'Iluminación LED',
      'Intensidad ajustable',
      'Base estable',
      'Material duradero',
      'Bajo consumo energético'
    ]
  },
  {
    id: 7,
    name: 'Set de Sartenes',
    category: 'home',
    price: 79.99,
    discount: 20,
    stock: 10,
    image: '/images/products/pans.jpg',
    gallery: [
      '/images/products/pans-1.jpg',
      '/images/products/pans-2.jpg',
      '/images/products/pans-3.jpg'
    ],
    description: 'Juego de sartenes antiadherentes de alta calidad para tu cocina.',
    features: [
      'Antiadherente avanzado',
      'Incluye 3 tamaños diferentes',
      'Aptas para todo tipo de cocinas',
      'Mangos ergonómicos',
      'Fácil limpieza'
    ]
  },
  {
    id: 8,
    name: 'Smartwatch Sport',
    category: 'electronics',
    price: 149.99,
    discount: 10,
    stock: 18,
    image: '/images/products/smartwatch.jpg',
    gallery: [
      '/images/products/smartwatch-1.jpg',
      '/images/products/smartwatch-2.jpg',
      '/images/products/smartwatch-3.jpg'
    ],
    description: 'Reloj inteligente con múltiples funciones para monitoreo de actividad física y salud.',
    features: [
      'Monitor de ritmo cardíaco',
      'GPS integrado',
      'Resistente al agua',
      'Batería de larga duración',
      'Compatible con iOS y Android'
    ]
  }
];

// Mock para el carrito
export const cartItems = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 599.99,
    quantity: 1,
    image: '/images/products/smartphone.jpg'
  },
  {
    id: 5,
    name: 'Zapatillas Deportivas',
    price: 89.99,
    quantity: 2,
    image: '/images/products/sneakers.jpg'
  },
  {
    id: 3,
    name: 'Auriculares Inalámbricos',
    price: 129.99,
    quantity: 1,
    image: '/images/products/headphones.jpg'
  }
];

// Funciones de utilidad para acceder a los datos

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  
  return products.filter(product => product.discount > 0);
}

export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

export function getRelatedProducts(category, currentProductId) {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4); 
}

export function getCartItems() {
  return cartItems;
}