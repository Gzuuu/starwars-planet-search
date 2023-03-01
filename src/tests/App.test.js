import React from 'react';
import { queryByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import FetchProvider from '../context/FetchProvider';
import { data } from '../helpers/data';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


describe('Testes App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => data
    }))
  });

  afterEach(() => {
    global.fetch.mockRestore()
  });
  it('verifica se a API foi chamara corretamente', async () => {
    render(
    <FetchProvider>
      <App />
    </FetchProvider>)
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('Verifica se a table está na tela e contém o tamanho certo', async () => {
    render(
    <FetchProvider>
      <App />
    </FetchProvider>)
    const tableOptions = await screen.findAllByRole('columnheader')
    expect(tableOptions).toHaveLength(13);
  })

  it('verifica se todos as opções de filtro estão na tela', async () => {
    render(
      <FetchProvider>
        <App />
      </FetchProvider>)
    const inputFilter = await screen.findByTestId('name-filter');
    expect(inputFilter).toBeInTheDocument();
    const selectCategory = await screen.findByTestId('column-sort');
    expect(selectCategory).toBeInTheDocument();
    const descendenteInput = await screen.findByRole('radio', {  name: /descendente/i});
    const ascendentInput = await screen.findByRole('radio', {  name: /ascendente/i});
    expect(descendenteInput).toBeInTheDocument();
    expect(ascendentInput).toBeInTheDocument();
    const numericFilter = await screen.findByRole('spinbutton');
    expect(numericFilter).toBeInTheDocument()
  })

  it('verifica se o filtro de texto funciona corretamente', async() => {
    render(
      <FetchProvider>
        <App />
      </FetchProvider>)
      const inputFilter = await screen.findByTestId('name-filter');
      act(async() => {
      userEvent.type(inputFilter, 'ta')
      const planets = await screen.findAllByTestId('planet-name')
      expect(planets).toHaveLength(1)
      userEvent.type(inputFilter, '')
      expect(planets).toHaveLength(10)
      })
  })
})
