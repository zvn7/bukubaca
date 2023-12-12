import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Users() {
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Data Users</h1>
                </div>
                <div className="conten">
                    <button className="btn btn-primary mt-4">
                        Tambah Data
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Users;