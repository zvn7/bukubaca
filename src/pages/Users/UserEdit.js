import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./User.css";

function UsersEdit() {
  // Membuat komponen fungsi UsersDelete menggunakan useParams hook untuk mendapatkan id dari parameter URL dan useState hook untuk mengelola state form (formValue)
  const { id } = useParams();
  const [formValue, setformValue] = React.useState({
    nama: "",
    username: "",
    sandi: "",
    status: "",
    role: "",
  });

  // Fungsi ini menggunakan useEffect untuk memanggil fectData setelah komponen dimuat. Fungsi fectData mengambil data pengguna berdasarkan ID menggunakan Axios dan mengupdate state formValue
  React.useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    const response = await axios.get(
      "http://localhost:5154/User/GetUserById?id=" + id
    );
    const data = await response.data.data;
    setformValue(data);
    console.log(data);
  };

  // Fungsi ini dijalankan setiap kali ada perubahan pada input form. Ini memperbarui state formValue dengan nilai yang dimasukkan
  const handleChange = event => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  // Fungsi ini dipanggil saat formulir dikirim. Membuat objek FormData yang berisi nilai formulir, kemudian mengirim permintaan PUT menggunakan Axios ke endpoint "http://localhost:5154/User/DeleteUser"
  const handleSubmit = async () => {
    const FormDataInput = new FormData();
    FormDataInput.append("nama", formValue.nama);
    FormDataInput.append("username", formValue.username);
    FormDataInput.append("sandi", formValue.sandi);
    FormDataInput.append("status", formValue.status);
    FormDataInput.append("role", formValue.role);
    alert("Data berhasil diubah");
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:5154/User/UpdateUser?id=" + id,
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="card p-5 shadow">
      <div className="container mt-5">
        <div className="Title">
          <h1>Edit Data Trainer {id}</h1>
        </div>
        <div className="conten mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 col-4">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Enter nama"
                value={formValue.nama}
                onChange={e => handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                value={formValue.username}
                onChange={e => handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="sandi" className="form-label">
                Sandi
              </label>
              <input
                type="password"
                name="sandi"
                placeholder="Enter a sandi"
                value={formValue.sandi}
                onChange={e => handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                name="status"
                value={formValue.status}
                onChange={e => handleChange(e)}
                className="form-control"
              >
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                name="role"
                value={formValue.role}
                onChange={e => handleChange(e)}
                className="form-control"
              >
                <option value="1">Admin</option>
                <option value="2">Anggota</option>
              </select>
            </div>
            <div className="mb-3 col-4">
              <button type="submit" className="btn btn-success">
                {" "}
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UsersEdit;
