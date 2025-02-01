import React, {useCallback} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchItemsByQuery } from '../services/api';
import NoResults from '../components/NoResults/NoResults';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import ProductList from '../components/ProductList/ProductList';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import useFetch from '../hooks/useFetch';

const  SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

   const queryParams = new URLSearchParams(location.search);
   const search = queryParams.get('search') || '';

  const fetchData = useCallback(() => fetchItemsByQuery(search), [search]);
  const { data, error, loading } = useFetch(fetchData, [search]);
  
  const items = data?.items || [];
  const categories = data?.categories || [];

  if (loading) {
    return <LoadingIndicator/>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  } 

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };
  return (
    <div>
      <Breadcrumb categories={categories} />
    {
        items.length === 0 ? (
            <NoResults searchTerm={search}/>
        ): (
            <ProductList items={items} onItemClick={handleItemClick} />
        )
    }
  </div>
  );
}

export default SearchResults;
