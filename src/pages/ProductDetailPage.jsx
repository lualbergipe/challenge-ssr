import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { fetchItemById } from '../services/api';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import useFetch from '../hooks/useFetch';

function ProductDetailPage() {
  const { id } = useParams();

  const fetchData = useCallback(() => fetchItemById(id), [id]);
  const {data, loading, error} = useFetch(fetchData, [id])

  const item = data?.item;

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return null;
  }

  return (
   <>
    <Breadcrumb categories={[item.category]} />
    <ProductDetail item={item}/>
   </>
  );
}

export default ProductDetailPage;
