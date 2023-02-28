import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';
import useFormInput from '../hooks/userFormInput';

const numericFilter = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function FetchProvider({ children }) {
  const { apiFetch, error, isLoading } = useFetch();
  const [data, setData] = useState([]);
  const [nameFilter, setFilter] = useState('');
  const [numFilter, setNumFilter] = useState(numericFilter);
  const category = useFormInput('population');
  const parameter = useFormInput('maior que');
  const number = useFormInput(0);
  const [filteredByPref, setFilteredByPref] = useState([]);

  useEffect(() => {
    apiFetch(setData);
  }, []);

  const filteredByname = data
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter));

  const filterByPreferences = () => {
    const teste = filteredByname.filter((planet) => {
      if (parameter.value === 'maior que') {
        return planet[category.value] > Number(number.value);
      } if (parameter.value === 'menor que') {
        return planet[category.value] < Number(number.value);
      } if (parameter.value === 'igual a') {
        return Number(planet[category.value]) === Number(number.value);
      }
      return planet;
    });
    setFilteredByPref(teste);
  };

  const filterName = (name) => {
    setFilter(name);
  };

  const values = useMemo(() => ({
    filteredByPref,
    data,
    error,
    isLoading,
    filterName,
    nameFilter,
    numFilter,
    setNumFilter,
    category,
    parameter,
    number,
    filteredByname,
    filterByPreferences,
  }), [data, isLoading, error,
    nameFilter, numFilter, category, parameter, number, filteredByPref, filteredByname]);
  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
