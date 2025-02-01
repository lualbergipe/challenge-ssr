import React from 'react';
import search from "../../assets/images/ic_Search@2x.png";
import { useNavigate, Link } from 'react-router-dom';
import * as styles from './NoResults.module.scss';

function NoResults() {
    const navigate = useNavigate();
    
    const handleHome = () => {
        navigate(`/`);
    };
  return (
    <div className={styles.no__results_container}>
      <img src={search} className={styles.header__logo} alt="MercadoLibre" />
      <div>
        <h2>No hay publicaciones que coincidan con tu búsqueda.</h2>
        <ul>
          <li>Revisa la ortografía de la palabra</li>
          <li>Utiliza palabras más genéricas o menos palabras.</li>
        </ul>
        <Link to="/" className={styles.return} onClick={() => handleHome}>
            Voler
        </Link>
      </div>
    </div>
  );
}

export default NoResults;
