import React, { useState } from 'react';

const Table = ({ data, onFilterChange }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  
  const [filterStates, setFilterStates] = useState(
    columns.reduce((acc, column) => {
      acc[column] = {
        filterType: 'equals',
        filterValue1: '',
        filterValue2: ''
      };
      return acc;
    }, {})
  );

  const handleFilterTypeChange = (column, newFilterType) => {
    setFilterStates((prevStates) => ({
      ...prevStates,
      [column]: {
        ...prevStates[column],
        filterType: newFilterType,
      }
    }));
  };

  const handleFilterValueChange = (column, value, isSecondValue = false) => {
    setFilterStates((prevStates) => ({
      ...prevStates,
      [column]: {
        ...prevStates[column],
        ...(isSecondValue ? { filterValue2: value } : { filterValue1: value }),
      }
    }), () => {
      onFilterChange(column, {
        type: filterStates[column].filterType,
        value: filterStates[column].filterType === 'range' ? [filterStates[column].filterValue1, filterStates[column].filterValue2] : filterStates[column].filterValue1
      });
    });
  };

  const renderFilterInput = (column) => {
    const filterType = filterStates[column].filterType;
    const filterValue1 = filterStates[column].filterValue1;
    const filterValue2 = filterStates[column].filterValue2;

    switch (column) {
      case 'id':
      case 'age':
      case 'salary':
      case 'projectsCompleted':
        return (
          <div>
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(column, e.target.value)}
            >
              <option value="equals">Equals</option>
              <option value="less_than">Less than</option>
              <option value="less_than_or_equal">Less than or equal</option>
              <option value="greater_than">Greater than</option>
              <option value="greater_than_or_equal">Greater than or equal</option>
              <option value="range">Range</option>
              <option value="not_equal">Not equal</option>
            </select>
            {filterType !== 'range' ? (
              <input
                type="number"
                value={filterValue1}
                onChange={(e) => handleFilterValueChange(column, e.target.value)}
                placeholder="Value"
              />
            ) : (
              <>
                <input
                  type="number"
                  value={filterValue1}
                  onChange={(e) => handleFilterValueChange(column, e.target.value)}
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={filterValue2}
                  onChange={(e) => handleFilterValueChange(column, e.target.value, true)}
                  placeholder="Max"
                />
              </>
            )}
          </div>
        );
      case 'name':
      case 'role':
      case 'department':
      case 'accessLevel':
        return (
          <input
            type="text"
            value={filterValue1}
            onChange={(e) => handleFilterValueChange(column, e.target.value)}
            placeholder="Filter..."
          />
        );
      case 'hireDate':
      case 'lastLogin':
        return (
          <input
            type="date"
            value={filterValue1}
            onChange={(e) => handleFilterValueChange(column, e.target.value)}
            placeholder="Filter..."
          />
        );
      case 'isActive':
        return (
          <select
            value={filterValue1}
            onChange={(e) => handleFilterValueChange(column, e.target.value)}
          >
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
    <div>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
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
      )}
    </div>
  );
};

export default Table;
