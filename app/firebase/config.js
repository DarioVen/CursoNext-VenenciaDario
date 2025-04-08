// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  writeBatch 
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrU7nLFXJhXqOVuSyFOxmEPeeTSsN2Ohc",
  authDomain: "curso-nextjs-54259.firebaseapp.com",
  projectId: "curso-nextjs-54259",
  storageBucket: "curso-nextjs-54259.firebasestorage.app",
  messagingSenderId: "724922179244",
  appId: "1:724922179244:web:12d0226bb3162d4c244909"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



const products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    category: 'electronics',
    price: 599.99,
    discount: 10,
    stock: 15,
    image: '/images/products/electronics/smartphone.jpg',
    gallery: [
      '/images/products/electronics/smartphone-1.jpg',
      '/images/products/electronics/smartphone-2.jpg',
      '/images/products/electronics/smartphone-3.jpg'
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
    image: '/images/products/electronics/laptop.jpg',
    gallery: [
      '/images/products/electronics/laptop-1.jpg',
      '/images/products/electronics/laptop-2.jpg',
      '/images/products/electronics/laptop-3.jpg'
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
    image: '/images/products/electronics/headphones.jpg',
    gallery: [
      '/images/products/electronics/headphones-1.jpg',
      '/images/products/electronics/headphones-2.jpg',
      '/images/products/electronics/headphones-3.jpg'
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
    image: '/images/products/clothing/tshirt.jpg',
    gallery: [
      '/images/products/clothing/tshirt-1.jpg',
      '/images/products/clothing/tshirt-2.jpg',
      '/images/products/clothing/tshirt-3.jpg'
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
    image: '/images/products/clothing/sneakers.jpg',
    gallery: [
      '/images/products/clothing/sneakers-1.jpg',
      '/images/products/clothing/sneakers-2.jpg',
      '/images/products/clothing/sneakers-3.jpg'
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
    image: '/images/products/home/lamp.jpg',
    gallery: [
      '/images/products/home/lamp-1.jpg',
      '/images/products/home/lamp-2.jpg',
      '/images/products/home/lamp-3.jpg'
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
    image: '/images/products/home/pans.jpg',
    gallery: [
      '/images/products/home/pans-1.jpg',
      '/images/products/home/pans-2.jpg',
      '/images/products/home/pans-3.jpg'
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
    image: '/images/products/electronics/smartwatch.jpg',
    gallery: [
      '/images/products/electronics/smartwatch-1.jpg',
      '/images/products/electronics/smartwatch-2.jpg',
      '/images/products/electronics/smartwatch-3.jpg'
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

// Función para cargar un producto a la vez
async function uploadProductsOneByOne() {
  try {
    console.log('Iniciando carga de productos uno por uno...');
    
    for (const product of products) {

      const { id, ...productData } = product;
      
      const docRef = await addDoc(collection(db, "products"), productData);
      console.log(`Producto "${product.name}" añadido con ID: ${docRef.id}`);
    }
    
    console.log('Todos los productos han sido cargados correctamente.');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Función para cargar todos los productos en un lote (batch)

async function uploadProductsInBatch() {
  try {
    console.log('Iniciando carga de productos en lote...');
    
    const batch = writeBatch(db);
    
    products.forEach((product) => {

      const { id, ...productData } = product;
      
      
      const docRef = doc(collection(db, "products")); 
      
      batch.set(docRef, productData);
    });
    
    await batch.commit();
    console.log('Lote completado: Todos los productos cargados correctamente.');
  } catch (error) {
    console.error('Error al cargar el lote de productos:', error);
  }
}

export { uploadProductsOneByOne, uploadProductsInBatch };
