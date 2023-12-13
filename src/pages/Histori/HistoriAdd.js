import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HistoriAdd() {
  const [formValue, setformValue] = React.useState({
    id: 0,
    id_buku: "",
    id_peminjam: "",
    tanggal_pinjam: "",
    tanggal_kembali: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const formDataInput = new FormData();
    formDataInput.append("id", formValue.id);
    formDataInput.append("id_buku", formValue.id_buku);
    formDataInput.append("id_peminjam", formValue.id_peminjam);
    formDataInput.append("tanggal_pinjam", formValue.tanggal_pinjam);
    formDataInput.append("tanggal_kembali", formValue.tanggal_kembali);
    console.log(formDataInput);
    alert("Data berhasil disimpan");
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5154/api/Histori/Histori/postHistori",
        data: formDataInput,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-5 shadow">
        <div className="Title">
          <h1>Tambah Data Peminjaman Buku</h1>
        </div>
        <div className="conten mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 col-4">
              <label htmlFor="id_buku" className="form-label">
                <h5>Id Buku :</h5>
              </label>
              <input
                type="text"
                name="id_buku"
                placeholder="Masukkan id buku anda"
                value={formValue.id_buku}
                onChange={handleChange}
                className="input-group input-group-sm mb-3"
              />
              <br />
              <label htmlFor="id_peminjam" className="form-label">
                <h5>Id User :</h5>
              </label>
              <input
                type="text"
                name="id_peminjam"
                placeholder="Masukkan id user anda"
                value={formValue.id_peminjam}
                onChange={handleChange}
                className="input-group input-group-sm mb-3"
              />
              <br />
              <label htmlFor="tanggal_kembali" className="form-label">
                <h5>Tanggal Pinjam :</h5>
              </label>
              <div className="input-group mb-3">
                <input
                  type="date"
                  name="tanggal_kembali"
                  value={formValue.tanggal_kembali}
                  onChange={handleChange}
                  className="input-group input-group-sm mb-3"
                />
                <label htmlFor="tanggal_pinjam" className="form-label">
                  <h5>Tanggal Kembali :</h5>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="date"
                    name="tanggal_pinjam"
                    value={formValue.tanggal_pinjam}
                    onChange={handleChange}
                    className="input-group input-group-sm mb-3"
                  />
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-success">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HistoriAdd;
