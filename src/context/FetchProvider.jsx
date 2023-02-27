import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch(setData);
  }, [apiFetch]);

  const values = useMemo(() => ({
    data, error, isLoading,
  }), [data, isLoading, error]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
