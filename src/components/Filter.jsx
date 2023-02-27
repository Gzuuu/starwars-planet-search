import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

export default function Filter() {
  const { isLoading } = useContext(FetchContext);
  return (
    isLoading && <input type="text" data-testid="name-filter" placeholder="Pesquisar" />
  );
}
