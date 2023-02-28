import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

const categoryFilters = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState([]);
  const [nameFilter, setFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(categoryFilters);

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
  const removeCategory = () => {
    const withoutSameCategory = categoryFilters;
    filterOptions.map((a) => {
      if (withoutSameCategory.some((s) => s === a.cat)) {
        const index = withoutSameCategory.indexOf(a.cat);
        withoutSameCategory.splice(index, 1);
      }
      return a;
    });
    setCategoryFilter(withoutSameCategory);
  };

  const values = useMemo(() => ({
    data,
    error,
    isLoading,
    filterName,
    nameFilter,
    categoryFilter,
    setCategoryFilter,
    filteredByname,
    filterByPreferences,
    filterOptions,
    removeCategory,
    setFilterOptions,
  }), [data, isLoading, error,
    nameFilter, categoryFilter, filterOptions, filteredByname]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
