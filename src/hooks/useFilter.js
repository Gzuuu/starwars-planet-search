import { useContext } from 'react';
import FetchContext from '../context/FetchContext';

const useFilter = () => {
  const { data, nameFilter, isLoading } = useContext(FetchContext);

  const filteredByname = isLoading
  && data.filter((planet) => planet.name.toLowerCase().includes(nameFilter));

  return { filteredByname };
};

export default useFilter;
