import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
function UsersEdit() {
  const { id } = useParams();
  //define state
  const [formValue, setformValue] = React.useState({
    nama: "",
    username: "",
    sandi: "",
    status: "",
    role: "",
  });
  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "http://localhost:5154/User/GetUserById?id=" + id
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "formValue"
    setformValue(data);
    console.log(data);
  };
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
    FormDataInput.append("status", formValue.status);
    FormDataInput.append("role", formValue.role);
    alert("Data berhasil diubah");
    try {
      // make axios post request
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
    <div className="card">
      <div className="container">
        <div className="Titel">Edit Data Trainer {id}</div>
        <div className="conten">
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
              name="status"
              placeholder="enter a status"
              value={formValue.status}
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
            <button type="submit" className="btn btn-primary">
              {" "}
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="container mt-5">
  //       <div className="card p-5 shadow">
  //         <div className="Title">
  //           <h1>Edit Data Buku</h1>
  //         </div>
  //         <div className="conten mt-4">
  //           <form>
  //             <div className="mb-3 col-4">
  //               <label htmlFor="judul" className="form-label">
  //                 Judul :
  //               </label>
  //               <input type="text" className="form-control" name="judul" />
  //               <button type="submit" className="btn btn-success">
  //                 Simpan
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
export default UsersEdit;
