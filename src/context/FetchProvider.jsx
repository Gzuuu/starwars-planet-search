import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState(null);
  const [nameFilter, setFilter] = useState('');

  useEffect(() => {
    apiFetch(setData);
  }, []);

  const filterName = (name) => {
    setFilter(name);
  };

  const values = useMemo(() => ({
    data, error, isLoading, filterName, nameFilter,
  }), [data, isLoading, error, nameFilter]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
