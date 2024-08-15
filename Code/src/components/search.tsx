import React, { useState } from 'react';

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    window.open(`https://google.com/search?q=${encodeURIComponent(inputValue)}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Search Google"
          aria-label="Search Google"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="btn btn-outline-secondary" type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchInput;
