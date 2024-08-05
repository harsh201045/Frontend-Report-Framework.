import React, { useState } from 'react';
import './App.css';
import mockData from './mockData';
import Table from './components/Table';

function App() {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (column, filter) => {
    setFilters({
      ...filters,
      [column]: filter,
    });
  };

  const filteredData = data.filter(row => {
    // Apply column-specific filters
    return Object.keys(filters).every(column => {
      const filter = filters[column];
      if (!filter || filter.value === '') return true;

      const value = row[column];
      switch (filter.type) {
        case 'equals':
          return String(value) === String(filter.value);
        case 'contains':
          return String(value).toLowerCase().includes(filter.value.toLowerCase());
        case 'date_is':
          return new Date(value).toISOString().split('T')[0] === filter.value;
        case 'greater_than':
          return Number(value) > Number(filter.value);
        case 'less_than':
          return Number(value) < Number(filter.value);
        case 'greater_than_or_equal':
          return Number(value) >= Number(filter.value);
        case 'less_than_or_equal':
          return Number(value) <= Number(filter.value);
        case 'not_equal':
          return String(value) !== String(filter.value);
        case 'range':
          return Number(value) >= Number(filter.value[0]) && Number(value) <= Number(filter.value[1]);
        case 'is_null':
          return value === null;
        case 'is_not_null':
          return value !== null;
        default:
          return true;
      }
    });
  });

  return (
    <div className="App">
      <Table data={filteredData} onFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
