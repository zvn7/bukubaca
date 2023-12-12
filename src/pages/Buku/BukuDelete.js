import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function BukuDelete() {
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Hapus Data Buku</h1>
                </div>
                <div className="conten mt-4">
                    <form>
                        <div className="mb-3 col-4">
                            <label htmlFor="judul" className="form-label">
                                Judul :
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="judul"
                            />
                            <button type="submit" className="btn btn-danger">
                                Hapus
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default BukuDelete;