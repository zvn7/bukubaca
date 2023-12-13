import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Histori() {
  const [datahistori, setDataHistori] = useState([]);

  useEffect(() => {
    fectData();
  }, []);

  const fectData = async () => {
    const response = await axios.get(
      "http://localhost:5154/api/Histori/Histori/GetAllHistori"
    );
    const data = await response.data.data;
    setDataHistori(data);
    console.log(data);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Buku",
      selector: (row) => row.buku,
      sortable: true,
    },
    {
      name: "Peminjam",
      selector: (row) => row.peminjam,
      sortable: true,
    },
    {
      name: "Tanggal Pinjam",
      selector: (row) => row.tanggal_pinjam,
      sortable: true,
    },
    {
      name: "Tanggal Kembali",
      selector: (row) => row.tanggal_kembali,
      sortable: true,
    },
    
  ];
  return (
    <div className="container mt-5">
      <div className="card p-5 shadow">
        <div className="Title">
          <h1>Data Histori Peminjaman</h1>
        </div>
        <div className="conten">
          <a href="/histori/add" className="btn btn-primary mt-4">
            Tambah Data
          </a>
          <DataTable columns={columns} data={datahistori} pagination />
        </div>
      </div>
    </div>
  );
}
export default Histori;
