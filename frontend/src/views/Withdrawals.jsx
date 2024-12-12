import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import moment from 'moment';

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
	let result;

	const columnDelimiter = ',';
	const lineDelimiter = '\n';
	const keys = Object.keys(data[0]);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach(item => {
		let ctr = 0;
		keys.forEach(key => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
	const link = document.createElement('a');
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute('href', encodeURI(csv));
	link.setAttribute('download', filename);
	link.click();
}

const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;

export default function Withdrawals() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [filteredwithdrawals, setFilteredWithdrawals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

    const columns = [
        {
            name: "Amount",
            selector: (row) => row.amount,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => moment(row.created_at).fromNow(),
            sortable: true,
        },
        {
        name: "Reference",
        selector: (row) => row.reference,
        sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex flex-wrap gap-2 py-2">
                <Link className="btn btn-outline-primary bi bi-eye btn-sm" to={`${row.id}/view`}> view</Link>
              </div>
            ),
          },
    ];

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = () => {
        axiosClient
            .get("/withdrawals")
            .then(({ data }) => {
                setWithdrawals(data.withdrawals);
                setFilteredWithdrawals(data.withdrawals);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    
        // Filter traders based on search term
        const filtered = withdrawals.filter(
          (withdrawal) =>
            withdrawal.amount.toString().includes(searchTerm)
        );
    
        setFilteredWithdrawals(filtered);
      };

    return (
        <div className="container">
            <div className="col-12 mx-auto my-5">
                <div className="card">
                    <div className="card-body">
                        <div className="input-group md-form pt-5 pb-5 form-sm form-2 pl-0">
                            <input
                                className="form-control my-0 py-1 red-border"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <div className="input-group-append">
                                {/* <span
                                    className="input-group-text red lighten-3"
                                    id="basic-text1"
                                >
                                    <i
                                        className="fas fa-search text-grey"
                                        aria-hidden="true"
                                    ></i>
                                </span> */}
                            </div>
                        </div>
                        <DataTable
                            title="Withdrawals"
                            data={filteredwithdrawals}
                            columns={columns}
                            selectableRows
                            pagination
                            // actions={actionsMemo}
                        />
                        {/* <div className="gap-2">
                            <Link className="btn btn-primary" to="/register">
                                Register a Trader
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

