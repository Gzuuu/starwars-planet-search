import { useState } from 'react';

const api = 'https://swapi.dev/api/planets';

const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  async function apiFetch() {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const data = await response.json();
      const withoutResidents = data.results.map((result) => {
        delete result.residents;
        return result;
      });
      setLoading(true);
      return withoutResidents;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(true);
    }
  }
  return { isLoading, error, apiFetch };
};

export default useFetch;
