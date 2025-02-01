import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import * as styles from './ProductList.module.scss';

function ProductList({ items, onItemClick }) {
  return (
    <div className={styles.product__list}>
      {items.map(item => (
        <ProductItem 
          key={item.id} 
          item={item} 
          onClick={() => onItemClick(item.id)} 
        />
      ))}
    </div>
  );
}

export default ProductList;
