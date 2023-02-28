import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

export default function RemoveFilter() {
  const { filterOptions } = useContext(FetchContext);

  return (
    <div>
      { filterOptions.length > 0 ? filterOptions
        .map((option, index) => {
          const { cat, par, num } = option;
          return (
            <div key={ index }>
              <p>{`${cat} ${par} ${num}`}</p>
              <button
                onClick={ (e) => {
                  e.preventDefault();
                  // removeOption({ cat, par, num });
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
