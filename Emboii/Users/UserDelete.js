import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function UsersDelete() {
  const { id } = useParams();
  const [formValue, setformValue] = React.useState({
    nama: "",
    username: "",
    status: "",
    role: "",
  });
  React.useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5154/User/GetUserById?id=" + id
      );
      const data = await response.data.data;
      if (data) {
        setformValue(data);
        console.log(data);
      } else {
        console.log("Data tidak ditemukan atau sudah dihapus!");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat mengambil data!");
    }
  };
  const handleChange = event => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async () => {
    const FormDataInput = new FormData();
    FormDataInput.append("nama", formValue.nama);
    FormDataInput.append("username", formValue.username);
    FormDataInput.append("status", formValue.status);
    FormDataInput.append("role", formValue.role);
    alert("Data berhasil dihapus");
    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url: "http://localhost:5154/User/DeleteUser?id=" + id,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="card">
      <div className="container">
        <div className="Titel">Hapus Data trainer {id}</div>
        <div className="conten">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama"
              value={formValue.nama}
              onChange={handleChange}
              disabled
            />
            <br />
            <br />
            <input
              type="text"
              name="username"
              value={formValue.username}
              onChange={handleChange}
              disabled
            />
            <br />
            <br />
            <input
              type="text"
              name="status"
              placeholder="enter a status"
              value={formValue.status}
              onChange={handleChange}
              disabled
            />
            <br />
            <br />
            <input
              type="text"
              name="role"
              placeholder="enter a role"
              value={formValue.role}
              onChange={handleChange}
              disabled
            />
            <br />
            <br />
            <button type="submit" className="btn btn-danger">
              {" "}
              Hapus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  // return (
  //     <div className="container mt-5">
  //         <div className="card p-5 shadow">
  //             <div className="Title">
  //                 <h1>Delete Data Buku</h1>
  //             </div>
  //             <div className="conten mt-4">
  //                 <form>
  //                     <div className="mb-3 col-4">
  //                         <label htmlFor="judul" className="form-label">
  //                             Judul :
  //                         </label>
  //                         <input
  //                             type="text"
  //                             className="form-control"
  //                             name="judul"
  //                         />
  //                         <button type="submit" className="btn btn-danger">
  //                             Simpan
  //                         </button>
  //                     </div>
  //                 </form>
  //             </div>
  //         </div>
  //     </div>
  // );
}
export default UsersDelete;
