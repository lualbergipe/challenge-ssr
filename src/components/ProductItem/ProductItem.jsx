import React from 'react';
import { formatPrice } from '../../utils/priceFormatter';
import free from '../../assets/images/ic_shipping.png';
import * as styles from './ProductItem.module.scss';

function ProductItem({ item, onClick }) {
  const { picture, title, price, free_shipping, condition } = item;
  const formattedPrice = formatPrice(price);

  return (
    <div className={styles.product__item} onClick={onClick}>
      <img className={styles.product__img} src={picture} alt={title} />
      <div className={styles.product__detail}>
        <h2>{formattedPrice} {free_shipping && <img src={free} alt="envío gratis" />}</h2>
        <p>{title}</p>
      </div>
      <span className={styles.product__condition}>{condition}</span>
    </div>
  );
}

export default ProductItem;
