import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function DataBuku() {
    const [databuku, setDatabuku] = useState([]);

    useEffect(() => {
        fectData();
    }, []);

    const fectData = async () => {
        const response = await axios.get("http://localhost:5000/buku");
        const data = await response.data.data[0]
        setDatabuku(data);
        console.log(data);
    }

    const columns = [
        {
            name: "No",
            selector: (row) => row.no,
            sortable: true,
        },
        {
            name: "Judul",
            selector: (row) => row.judul,
            sortable: true,
        },
        {
            name: "Pengarang",
            selector: (row) => row.pengarang,
            sortable: true,
        },
        {
            name: "Penerbit",
            selector: (row) => row.penerbit,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        className="btn btn-warning"
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            ),
            width: "170px",
        },
    ]

    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Data Buku</h1>
                </div>
                <div className="conten">
                    <button className="btn btn-primary mt-4">
                        Tambah Data
                    </button>
                    <DataTable columns={columns} data={databuku} pagination />
                </div>
            </div>
        </div>
    );
}
export default DataBuku;
