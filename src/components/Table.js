import React from 'react';

const Table = ({ data, onFilterChange }) => {
  if (data.length === 0) return <p>No data available</p>;

  const columns = Object.keys(data[0]);

  const handleFilterChange = (column, filter) => {
    onFilterChange(column, filter);
  };

  const renderFilterInput = (column) => {
    switch (column) {
      case 'id':
      case 'age':
      case 'salary':
      case 'projectsCompleted':
        return (
          <input
            type="number"
            onChange={(e) => handleFilterChange(column, { type: 'equals', value: e.target.value })}
            placeholder="Filter..."
          />
        );
      case 'name':
      case 'role':
      case 'department':
      case 'accessLevel':
        return (
          <input
            type="text"
            onChange={(e) => handleFilterChange(column, { type: 'contains', value: e.target.value })}
            placeholder="Filter..."
          />
        );
      case 'hireDate':
      case 'lastLogin':
        return (
          <input
            type="date"
            onChange={(e) => handleFilterChange(column, { type: 'date_is', value: e.target.value })}
            placeholder="Filter..."
          />
        );
      case 'isActive':
        return (
          <select onChange={(e) => handleFilterChange(column, { type: 'equals', value: e.target.value })}>
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>
              {column}
              {renderFilterInput(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td key={column}>{String(row[column])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
