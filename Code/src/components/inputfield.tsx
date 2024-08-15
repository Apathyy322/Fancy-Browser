import React, { useState } from 'react';

const MyInputField: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="myInput">Input Field:</label>
      <input
        id="myInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <p>Current Input: {inputValue}</p>
    </div>
  );
};

export default MyInputField;
