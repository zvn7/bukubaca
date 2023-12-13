import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function BukuEdit() {
    const { id } = useParams();
    //define state
    const [formValue, setformValue] = React.useState({
        judul: '',
        pengarang: '',
        penerbit: ''
    });
    //useEffect hook
    React.useEffect(() => {
        //panggil method "fetchData"
        fectData();
    }, []);
    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await
            axios.get("http://localhost:5154/api/Buku/Buku/getBukuById/" + id);
        //get response data
        const data = await response.data;
        //assign response data to state "formValue"
        setformValue(data);
        console.log(data);
    }
    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async () => {
        // store the states in the form data
        const FormDataInput = new FormData();
        FormDataInput.append("judul", formValue.judul)
        FormDataInput.append("pengarang", formValue.pengarang)
        FormDataInput.append("penerbit", formValue.penerbit)
        alert('Data berhasil diubah')
        try {
            // make axios post request
            const response = await axios({
                method: "PUT",
                url: "http://localhost:5154/api/Buku/Buku/putBuku/" + id,
                data: FormDataInput,
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow">
                <div className="Title">
                    <h1>Edit Data Buku</h1>
                </div>
                <div className="conten mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 col-4">
                            <label htmlFor="judul" className="form-label">
                                Judul:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="judul"
                                placeholder="enter judul"
                                value={formValue.judul}
                                onChange={handleChange}
                            />
                            <label htmlFor="pengarang" className="form-label">
                                Pengarang:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="pengarang"
                                placeholder="enter pengarang"
                                value={formValue.pengarang}
                                onChange={handleChange}
                            />
                            <label htmlFor="penerbit" className="form-label">
                                Penerbit:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="penerbit"
                                placeholder="enter penerbit"
                                value={formValue.penerbit}
                                onChange={handleChange}
                            /><br />
                            <button type="submit" className="btn btn-success">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default BukuEdit;