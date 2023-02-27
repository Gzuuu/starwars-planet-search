import { useContext } from 'react';
import FetchContext from '../context/FetchContext';

function Table() {
  const { data, isLoading } = useContext(FetchContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {isLoading && Object.keys(data[0]).map((key) => (
              <th key={ key }>
                { key }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && data.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
