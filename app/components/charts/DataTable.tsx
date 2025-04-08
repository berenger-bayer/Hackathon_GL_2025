"use client";

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: { [key: string]: any }[];
  columns: Column[];
  height?: number;
}

export function DataTable({ data, columns, height = 300 }: DataTableProps) {
  return (
    <div className="overflow-auto" style={{ height }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                  {column.cell ? column.cell(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}