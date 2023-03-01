import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import useFormInput from '../hooks/userFormInput';

export default function FilterByOrder() {
  const { categoryOptions, selectedFilter, setSelectedFilter } = useContext(FetchContext);
  const ordened = useFormInput('population');
  const orderOpt = useFormInput('ASC');

  const ordenedToChange = {
    order: {
      column: ordened.value,
      sort: orderOpt.value,
    },
  };

  function setOrder(obj) {
    const { order: { column, sort } } = obj;
    const ordernedFilter = selectedFilter.filter((planets) => (
      planets[column] !== 'unknown'));
    const onlyUnknows = selectedFilter.filter((planets) => (
      planets[column] === 'unknown'));
    const ordenedPlanets = (sort === 'DESC')
      ? ordernedFilter.sort((a, b) => Number(b[column]) - Number(a[column]))
      : ordernedFilter.sort((a, b) => Number(a[column]) - Number(b[column]));
    setSelectedFilter([...ordenedPlanets, ...onlyUnknows]);
  }

  return (
    <div>
      <select
        onChange={ (e) => ordened.handleChange(e) }
        data-testid="column-sort"
      >
        {categoryOptions.map((category) => (
          <option key={ category }>{ category }</option>))}
      </select>
      <label htmlFor="asc">
        <input
          type="radio"
          name="order"
          id="asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          onClick={ (e) => orderOpt.handleChange(e) }
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          type="radio"
          name="order"
          id="desc"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ (e) => orderOpt.handleChange(e) }
        />
        Descendente
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => setOrder(ordenedToChange) }
      >
        Ordenar
      </button>
    </div>
  );
}
