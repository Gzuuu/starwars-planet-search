import { useState } from 'react';

const api = 'https://swapi.dev/api/planets';

const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  async function apiFetch(setContextState) {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const data = await response.json();
      data.results.forEach((result) => delete result.residents);
      setLoading(true);
      setContextState(data.results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(true);
    }
  }
  return { isLoading, error, apiFetch };
};

export default useFetch;
