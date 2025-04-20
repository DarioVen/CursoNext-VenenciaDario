import { getProductById } from '../../firebase/firebaseUtils';

export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}