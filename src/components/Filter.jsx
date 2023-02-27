import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

export default function Filter() {
  const { filterName, isLoading } = useContext(FetchContext);

  return (
    isLoading && <input
      type="text"
      data-testid="name-filter"
      placeholder="Pesquisar"
      onChange={ (e) => {
        filterName(e.target.value.toLowerCase());
      } }
    />
  );
}
