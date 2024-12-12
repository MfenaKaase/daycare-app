import React from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment'; // Import moment library
import { Link } from 'react-router-dom';

const generateColumns = (type) => {
  let columns = [
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => moment(row.created_at).fromNow(),
      sortable: true,
    },
    {
      name: 'Reference',
      selector: (row) => row.reference,
      sortable: true,
    },
  ];

  // Add conditional columns based on the type
  if (type === 'withdrawals' || type === 'savings') {
    columns.push({
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2 py-2">
          {row.user}
          <Link
            className="btn btn-outline-primary bi bi-eye btn-sm"
            to={`/${type}/${row.id}/${type == 'withdrawals'? 'view' : 'receipt'}`}
          >
            {type == 'withdrawals' ? ' view' : ' receipt'}
          </Link>
        </div>
      ),
    });
  }

  return columns;
};

const CustomDataTable = ({ type, data }) => {
  const columns = generateColumns(type);

  return (
    <DataTable
      title={type === 'trader' ? `${type} Handled` : `${type}`}
      data={data}
      columns={columns}
      selectableRows
      pagination
      type={type}
    />
  );
};

export default CustomDataTable;
