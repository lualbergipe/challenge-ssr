import React from 'react';
import * as styles from '../../styles/App.module.scss';

function Breadcrumb({ categories = [] }) {
  return (
    <nav className={styles.breadcrumb}>
      {categories.map((cat, idx) => (
        <span key={idx} className="breadcrumb__item">
          {cat}
          {idx < categories.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
