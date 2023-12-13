import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Users() {
  // Hook useState untuk menyimpan data pengguna dan useEffect untuk memanggil fungsi fectData saat komponen dimuat
  const [listuser, setListuser] = useState([]);

  useEffect(() => {
    fectData();
  }, []);

  // fectData adalah fungsi asinkron yang menggunakan axios untuk mengambil data pengguna dari backend dan mengatur state listuser dengan data tersebut.
  const fectData = async () => {
    const response = await axios.get("http://localhost:5154/User/GetAllData");
    const data = await response.data.data;
    setListuser(data);
    console.log(data);
  };

  const kolom = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
    },
    {
      name: "Nama",
      selector: row => row.nama,
      sortable: true,
    },
    {
      name: "Username",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
    },
    {
      name: "Role",
      selector: row => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      selector: row => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={"/users/edit/" + row.id} className="btn btn-warning">
            Edit
          </Link>
          <Link to={"/users/delete/" + row.id} className="btn btn-danger">
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
        <div className="Title">Data Users</div>
        <div className="conten">
          <Link to="/users/add" className="btn btn-primary mt-4">
            Tambah Data
          </Link>
          <DataTable columns={kolom} data={listuser} pagination />
        </div>
      </div>
    </div>
  );
}
export default Users;
