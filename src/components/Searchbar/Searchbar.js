import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

const {
  searchbar,
  searchForm,
  searchForm_button,
  searchForm_button_label,
  searchForm_input,
} = css;

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={searchbar}>
      <form className={searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={searchForm_button}>
          <BsSearch />
          <span className={searchForm_button_label}></span>
        </button>

        <input
          className={searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
