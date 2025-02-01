import React from 'react';
import { formatPrice } from '../../utils/priceFormatter';
import { toast } from 'react-toastify';
import * as styles from './ProductDetail.module.scss';

function ProductDetail({ item }) {
  const { title, price, description, picture, condition, sold_quantity } = item;
  const formattedPrice = formatPrice(price);

  const handleBuyClick = () => {
    toast.success(`${title} agregado al carrito`, {
        autoClose: 2000 
      });;
    
  };
  return (
    <div className={styles.product__detail_container}>
      <div className={styles.product__detail_content}>
        <img className={styles.product__detail_img} src={picture} alt={title} />
        <div className={styles.product__detail_info}>
          <span className={styles.product__detail_condition}>{condition === 'new' ? 'Nuevo' : 'Usado'} - {sold_quantity} vendidos</span>
          <h1 className={styles.product_title}>{title}</h1>
          <h2 className={styles.product__detail_price}>{formattedPrice}</h2>
          <button className={styles.product__detail_btn} onClick={()=> handleBuyClick()}>Comprar</button>
        </div>
      </div>
      <div className={styles.product__detail_description}>
        <h3>Descripción del producto</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
