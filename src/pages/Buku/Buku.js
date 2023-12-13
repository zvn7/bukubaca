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
        const response = await axios.get(
            "http://localhost:5154/api/Buku/Buku/getAllBuku"
        );
        const data = await response.data.data;
        setDatabuku(data);
        console.log(data);
    };

    const columns = [
        {
            name: "#",
            selector: (row) => row.id,
            sortable: true,
            width: "55px",
            // Custom cell function to display sequential numbers
            cell: (row, index) => <div>{index + 1}</div>,
        },
        // {
        //     name: "No",
        //     selector: (row) => row.id,
        //     sortable: true,
        // },
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
            name: "Kategori",
            selector: (row) => row.kategori,
            sortable: true,
        },
        {
            name: "Issn",
            selector: (row) => row.issn,
            sortable: true,
        },
        {
            name: "Jumlah Halaman",
            selector: (row) => row.jumlah_halaman,
            sortable: true,
        },
        {
            name: "Tahun",
            selector: (row) => row.tahun,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                        to={"/buku/edit/" + row.id}
                        className="btn btn-warning"
                    >
                        Edit
                    </Link>
                    <Link
                        to={"/buku/delete/" + row.id}
                        className="btn btn-danger"
                    >
                        Delete
                    </Link>
                </div>
            ),
            width: "170px",
        },
    ];

    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Data Buku</h1>
                </div>
                <div className="conten">
                    <Link to="/buku/add" className="btn btn-primary">
                        Tambah Buku
                    </Link>
                    <DataTable columns={columns} data={databuku} pagination />
                </div>
            </div>
        </div>
    );
}
export default DataBuku;
