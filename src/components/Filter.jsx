import { useState } from 'react';

const Filter = (props) => {
  const { category, setFilter } = props;

  const handleChange = (e) => {
    setFilter(e.target.value);
    
  };

  return (
    <div>
      <select
        className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>Filter</option>
        {category.map(el => (
          <option key={el.id} value={el.id}>{el.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
