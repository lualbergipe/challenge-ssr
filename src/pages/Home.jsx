import React from 'react';
import * as styles from '../styles/App.module.scss';
 
const Home = () => {

  return (
    <div className={styles.home__container}>
      <h1>Bienvenido a MercadoChallenge</h1>
      <p>Busca el artículo que quieras</p>
    </div>
  );
};

export default Home;
