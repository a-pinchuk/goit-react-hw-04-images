import { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  const onSearch = e => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div>
      <SearchHeader>
        <SearchForm onSubmit={submitHandler}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onSearch}
          />
        </SearchForm>
      </SearchHeader>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
