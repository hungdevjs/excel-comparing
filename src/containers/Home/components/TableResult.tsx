import React, { FC } from 'react';
import { Table } from 'reactstrap';

interface Props {
  data: any;
  columnNames: string[];
  generateBackgroundColor: (data: any) => string;
}

const TableResult: FC<Props> = ({
  data,
  columnNames,
  generateBackgroundColor,
}: Props) => {
  if (!data) return <p>No data.</p>;
  return (
    <Table size="sm" responsive striped bordered hover className="result-table">
      <thead>
        <tr>
          <th>No.</th>
          {columnNames.map((column, index) => (
            <th key={index} className="align-top">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {Object.values(item).map((cell: any, index: number) => (
              <td
                key={index}
                style={{
                  backgroundColor: generateBackgroundColor(cell),
                }}
              >
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableResult;
