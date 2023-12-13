import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UsersAdd() {
  // Membuat komponen fungsi UsersAdd menggunakan useState hook untuk mengelola state form (formValue)
  const [formValue, setformValue] = React.useState({
    nama: "",
    username: "",
    sandi: "",
    role: "",
  });

  // Fungsi handleChange dijalankan setiap kali ada perubahan pada input form. Ini memperbarui state formValue dengan nilai yang dimasukkan
  const handleChange = event => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  // Fungsi handleSubmit dipanggil saat formulir dikirim. Membuat objek FormData yang berisi nilai formulir, kemudian mengirim permintaan POST menggunakan Axios ke endpoint "http://localhost:5154/User/CreateUser"
  const handleSubmit = async () => {
    const FormDataInput = new FormData();
    FormDataInput.append("nama", formValue.nama);
    FormDataInput.append("username", formValue.username);
    FormDataInput.append("sandi", formValue.sandi);
    FormDataInput.append("role", formValue.role);
    alert("Data berhasil disimpan");
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5154/User/CreateUser",
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
          <h1>Tambah Data User</h1>
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
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                name="role"
                placeholder="Enter a role"
                value={formValue.role}
                onChange={e => handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3 col-4">
              <button type="submit" className="btn btn-success">
                {" "}
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UsersAdd;
