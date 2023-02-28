import React, { useContext } from 'react';
import useFormInput from '../hooks/userFormInput';
import FetchContext from '../context/FetchContext';
import RemoveFilter from './RemoveFilter';

export default function NumFilters() {
  const {
    numFilter,
    filterOptions,
    setFilterOptions } = useContext(FetchContext);

  const category = useFormInput('population');
  const parameter = useFormInput('maior que');
  const number = useFormInput(0);

  const options = {
    cat: category.value,
    par: parameter.value,
    num: number.value,
  };

  return (
    <div>
      <form>
        <label>
          <select
            defaultValue="population"
            data-testid="column-filter"
            onChange={ (e) => category.handleChange(e) }
          >
            {numFilter.map((optionsFilter) => (
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
          } }
        >
          Filtrar
        </button>
      </form>
      <RemoveFilter />
    </div>
  );
}
