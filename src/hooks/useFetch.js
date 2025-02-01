import { useState, useEffect, useCallback } from 'react';
/**
 * useFetch
 * Hook personalizado para manejar solicitudes HTTP.
 *
 * @param {Function} fetchFunction
 * @param {Array} dependencies
 * @returns {Object}
 */
export default function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);       
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'Ocurrió un error.');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
