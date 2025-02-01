import React from 'react';
import * as styles from './LoadingIndicator.module.scss';

function LoadingIndicator() {
  return (
    <div className={styles.loading__indicator}>
      <div className={styles.loading__indicator_spinner} />
      <p>Cargando...</p>
    </div>
  );
}

export default LoadingIndicator;
