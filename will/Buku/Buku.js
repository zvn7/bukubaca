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
        const response = await axios.get("https://localhost:5154/api/Buku/Buku/getAllBuku");
        const data = await response.data.data
        setDatabuku(data);
        console.log(data);
    }

    const columns = [
        {
            name: "No",
            selector: (row) => row.id,
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
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Edit",
            selector: row => (
                <Link to={"/buku/edit/" + row.id} className="btn btn-warning">
                    Edit
                </Link>
            ),
            sortable: true,
        },
        {
            name: "Hapus",
            selector: row => (
                <Link to={"/buku/delete/" + row.id} className="btn btn-danger">
                    Delete
                </Link>
            ),
            sortable: true,
        },
    ]

    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Data Buku</h1>
                </div>
                <div className="conten">
                    <Link to="/buku/add" className="btn btn-primary">Tambah Buku</Link>
                    <DataTable
                        columns={columns}
                        data={databuku}
                        pagination
                    />
                </div>
            </div>
        </div>
    );
}
export default DataBuku;
