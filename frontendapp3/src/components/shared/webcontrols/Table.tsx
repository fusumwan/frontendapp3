
/*

Explanation of Fixes:
renderCell Function:
Ensures that non-ReactNode values like strings, numbers, or booleans are safely converted to strings for rendering.
Returns the value as ReactNode if it already matches the expected type.
Explicit Casting:
Used value as ReactNode to handle cases where the data might already conform to ReactNode.



import React from 'react';
import Table from './Table';

interface Record {
  id: number;
  name: string;
  age: number;
}

const ExampleTable = () => {
  const data: Record[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
  ];

  return <Table data={data} columns={columns} />;
};

export default ExampleTable;

*/



import React, { JSX, ReactNode } from 'react';

interface TableProps<T> {
  data: T[];
  columns: {
    label: string;
    key: keyof T;
    render?: (value: any, row: T) => ReactNode;
  }[];
  onRowClick?: (row: T) => void;
}

const Table = <T,>({ data, columns, onRowClick }: TableProps<T>): JSX.Element => {
  const renderCell = (value: any, column: any, row: any): ReactNode => {
    if (column.render) {
      return column.render(value, row);
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }
    return value as ReactNode;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`cursor-pointer ${onRowClick ? 'hover:bg-gray-100' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700"
                >
                  {renderCell(row[col.key], col, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
