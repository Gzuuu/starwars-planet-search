import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

const numericFilter = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState([]);
  const [nameFilter, setFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [numFilter, setNumFilter] = useState(numericFilter);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await apiFetch();
      setData(results);
    };
    fetchResults();
  }, []);

  const filteredByname = data
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter));

  const filterByPreferences = () => {
    const filtered = filterOptions.map((filt) => {
      const { num, par, cat } = filt;
      return filteredByname.filter((planet) => {
        if (par === 'maior que') {
          return planet[cat] > Number(num);
        } if (par === 'menor que') {
          return planet[cat] < Number(num);
        } if (par === 'igual a') {
          return Number(planet[cat]) === Number(num);
        }
        return planet;
      });
    });
    const lastIndex = -1;
    setData(filtered.length > 0 ? filtered.at(lastIndex) : filtered);
  };

  useEffect(() => {
    filterByPreferences();
  }, [filterOptions]);

  const filterName = (name) => setFilter(name);

  // const removeOption = (obj) => {
  //   const filtered = filterOptions.filter((options) => options.cat !== obj.cat);
  //   setFilterOptions(filtered);
  // };

  const values = useMemo(() => ({
    data,
    error,
    isLoading,
    filterName,
    nameFilter,
    numFilter,
    setNumFilter,
    filteredByname,
    filterByPreferences,
    filterOptions,
    setFilterOptions,
    // removeOption,
  }), [data, isLoading, error,
    nameFilter, numFilter, filterOptions, filteredByname]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
