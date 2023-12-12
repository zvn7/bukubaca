import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UsersAdd() {
  const [formValue, setformValue] = React.useState({
    nama: "",
    username: "",
    sandi: "",
    role: "",
  });
  const handleChange = event => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async () => {
    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("nama", formValue.nama);
    FormDataInput.append("username", formValue.username);
    FormDataInput.append("sandi", formValue.sandi);
    FormDataInput.append("role", formValue.role);
    alert("Data berhasil disimpan");
    try {
      // make axios post request
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
        <div className="Title">Tambah Data Trainer</div>
        <div className="conten mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama"
              placeholder="enter nama"
              value={formValue.nama}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="username"
              placeholder="enter a username"
              value={formValue.username}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="password"
              name="sandi"
              placeholder="enter a sandi"
              value={formValue.sandi}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="role"
              placeholder="enter a role"
              value={formValue.role}
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="submit" className="btn btn-success">
              {" "}
              Tambahkan
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
  //                 <h1>Tambah Data User</h1>
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
  //                         <button type="submit" className="btn btn-success">
  //                             Simpan
  //                         </button>
  //                     </div>
  //                 </form>
  //             </div>
  //         </div>
  //     </div>
  // );
}
export default UsersAdd;
