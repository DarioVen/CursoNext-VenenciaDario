import Image from 'next/image';
import Counter from './Counter';

export default function CartItem({ item }) {
  const total = item.price * item.quantity;
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image 
          src={item.image} 
          alt={item.name} 
          width={100} 
          height={100}
          className="cart-product-img"
        />
      </div>
      
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <Counter initialValue={item.quantity} />
      </div>
      
      <div className="cart-item-total">
        <p>${total.toFixed(2)}</p>
      </div>
      
      <button className="btn-remove">
        <i className="icon-trash">🗑️</i>
      </button>
    </div>
  );
}