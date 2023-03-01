import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

const categoryOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState([]);
  const [nameFilter, setFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(categoryOptions);
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await apiFetch();
      setData(results);
    };
    fetchResults();
  }, []);

  const filterName = (name) => setFilter(name);

  const filterByPreferences = (fOpt) => {
    let newArr = [];

    fOpt?.forEach((opt) => {
      const { cat, num, par } = opt;
      if (par === 'maior que') {
        newArr = data.filter((planet) => planet[cat] > Number(num));
      } if (par === 'menor que') {
        newArr = data.filter((planet) => planet[cat] < Number(num));
      } if (par === 'igual a') {
        newArr = data.filter((planet) => planet[cat] === Number(num));
      }
    });
    setSelectedFilter(newArr);
  };

  const removeOption = (cat) => {
    const RemoveCatFilter = filterOptions.filter((opt) => opt.cat !== cat);
    setFilterOptions(RemoveCatFilter);
    filterByPreferences(RemoveCatFilter);
  };

  const addCategoryOptions = () => {
    const filterToCompare = filterOptions.map((options) => options.cat);
    const difference = categoryOptions
      .filter((categories) => !filterToCompare.includes(categories));
    setCategoryFilter(difference);
  };

  useEffect(() => {
    const filteredByname = data
      .filter((planet) => planet.name.toLowerCase().includes(nameFilter));
    if (nameFilter.length > 0) return setSelectedFilter(filteredByname);
    if (filterOptions.length > 0) return setSelectedFilter(selectedFilter);
    return setSelectedFilter(data);
  }, [nameFilter, data, filterOptions]);

  const values = useMemo(() => ({
    data,
    error,
    isLoading,
    filterName,
    nameFilter,
    removeOption,
    filterOptions,
    addCategoryOptions,
    categoryOptions,
    setCategoryFilter,
    filterByPreferences,
    selectedFilter,
    categoryFilter,
    setSelectedFilter,
    setFilterOptions,
  }), [data, isLoading, error, selectedFilter, categoryFilter,
    nameFilter, filterOptions]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
