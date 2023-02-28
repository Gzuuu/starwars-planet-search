import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

export default function NumFilters() {
  const {
    numFilter,
    category,
    number,
    filterByPreferences,
    parameter } = useContext(FetchContext);

  return (
    <form>
      <label>
        <select
          defaultValue="population"
          data-testid="column-filter"
          onChange={ (e) => category.handleChange(e) }
        >
          {numFilter.map((options) => (
            <option value={ options } key={ options }>{ options }</option>
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
          filterByPreferences();
        } }
      >
        Filtrar
      </button>
    </form>
  );
}
