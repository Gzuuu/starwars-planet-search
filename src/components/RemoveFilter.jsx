import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

export default function RemoveFilter() {
  const {
    filterOptions,
    removeOption,
    setFilterOptions,
    addCategoryOptions } = useContext(FetchContext);

  return (
    <div>
      {filterOptions.length > 0 && (
        <button
          data-testid="button-remove-filters"
          onClick={ () => setFilterOptions([]) }
        >
          Remover todos filtros
        </button>)}
      { filterOptions.length > 0 ? filterOptions
        .map((option, index) => {
          const { cat, par, num } = option;
          return (
            <div key={ index } data-testid="filter">
              <p>{`${cat} ${par} ${num}`}</p>
              <button
                onClick={ (e) => {
                  e.preventDefault();
                  removeOption(cat);
                  addCategoryOptions(cat);
                } }
              >
                Excluir
              </button>
            </div>
          );
        }) : '' }
    </div>
  );
}
