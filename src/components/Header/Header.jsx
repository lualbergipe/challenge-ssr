import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/images/Logo_ML.png";
import searchIcon from '../../assets/images/ic_Search.png';
import * as styles from './Header.module.scss';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/items?search=${searchTerm}`);
    } 
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__container}>
        <Link to="/">
            <img src={logo} className={styles.header__logo} alt="MercadoLibre" />
        </Link>
        <form className={styles.search} onSubmit={handleSubmit} role="search">
            <input
            type="text"
            id="search-field"
            placeholder="Nunca dejes de buscar"
            className={styles.search__input}
            value={searchTerm}
            onChange={handleChange}
            aria-label="Buscar productos"
          />
          <button type="submit" className={styles.search__button}>
              <img src={searchIcon} alt="Boton buscar" />
          </button>
        </form>
      </nav>
    </header>
  )
}

export default Header
