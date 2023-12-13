import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function BukuDelete() {
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
        try {
            //fetching
            const response = await
                axios.get("http://localhost:5154/api/Buku/Buku/getBukuById/" + id);
            //get response data
            const data = await response.data;
            //assign response data to state "formValue"
            setformValue(data);
            console.log(data);
        } catch (error) {
            console.log(error)
            alert('Data tidak ditemukan atau sudah dihapus!')
        }
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
        FormDataInput.append("pengarang", formValue.penerbit)
        alert('Status berhasil diubah')
        try {
            // make axios post request
            const response = await axios({
                method: "delete",
                url: "http://localhost:5154/api/Buku/Buku/deleteBuku/" + id,
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
                    <h1>Hapus Data Buku</h1>
                </div>
                <div className="conten mt-4">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="judul"
                            placeholder="enter judul"
                            value={formValue.judul}
                            onChange={handleChange}
                        /><br /><br />
                        <input
                            type="text"
                            name="pengarang"
                            placeholder="enter pengarang"
                            value={formValue.pengarang}
                            onChange={handleChange}
                        /><br /><br />
                        <input
                            type="text"
                            name="penerbit"
                            placeholder="enter penerbit"
                            value={formValue.penerbit}
                            onChange={handleChange}
                        /><br /><br />
                        <button type="submit" className='btn btn-danger'> Hapus
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default BukuDelete;