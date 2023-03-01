import React, { useContext, useEffect, useState } from 'react';
import useFormInput from '../hooks/userFormInput';
import FetchContext from '../context/FetchContext';
import RemoveFilter from './RemoveFilter';

export default function NumFilters() {
  const {
    categoryFilter,
    filterOptions,
    filterByPreferences,
    addCategoryOptions,
    selectedFilter,
    setSelectedFilter,
    setCategoryFilter,
    setFilterOptions } = useContext(FetchContext);
  const [category, setCategory] = useState('population');
  const parameter = useFormInput('maior que');
  const number = useFormInput(0);

  const options = {
    cat: category,
    par: parameter.value,
    num: number.value,
  };

  const removeCategory = () => {
    const withoutSameCategory = categoryFilter;
    filterOptions.map((option) => {
      if (withoutSameCategory.some((cat) => cat === option.cat)) {
        const index = withoutSameCategory.indexOf(option.cat);
        withoutSameCategory.splice(index, 1);
        setCategoryFilter(withoutSameCategory);
      }
      return option;
    });
  };
  const applyFilter = (obj) => {
    const { par, cat, num } = obj;
    let newArray = [];
    if (par === 'maior que') {
      newArray = selectedFilter
        ?.filter((planet) => Number(planet[cat] > Number(num)));
    }

    if (par === 'menor que') {
      newArray = selectedFilter
        ?.filter((planet) => Number(planet[cat] < Number(num)));
    }

    if (par === 'igual a') {
      newArray = selectedFilter
        ?.filter((planet) => Number(planet[cat]) === Number(num));
    }
    setSelectedFilter(newArray);
  };

  useEffect(() => {
    removeCategory();
    filterByPreferences(filterOptions);
    addCategoryOptions();
    setCategory(categoryFilter[0]);
  }, [filterOptions]);

  return (
    <div>
      <form>
        <label>
          <select
            data-testid="column-filter"
            onChange={ (e) => setCategory(e.target.value) }
          >
            {categoryFilter.map((optionsFilter) => (
              <option
                value={ optionsFilter }
                key={ optionsFilter }
              >
                { optionsFilter }
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            data-testid="comparison-filter"
            defaultValue="maior que"
            onChange={ (e) => parameter.handleChange(e) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            data-testid="value-filter"
            defaultValue={ 0 }
            onChange={ (e) => number.handleChange(e) }
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ (e) => {
            e.preventDefault();
            setFilterOptions([...filterOptions, options]);
            applyFilter(options);
          } }
          disabled={ !categoryFilter.length }
        >
          Filtrar
        </button>
      </form>
      <RemoveFilter />
    </div>
  );
}
