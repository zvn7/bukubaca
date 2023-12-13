import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HistoriAdd() {
  const [databuku, setDatabuku] = React.useState([
    {
      id: "",
      judul: "",
    },
  ]);
  const [datauser, setDatauser] = React.useState([
    {
      id: "",
      nama: "",
    },
  ]);
  const [formValue, setFormValue] = React.useState({
    id: 0,
    id_buku: 0,
    id_peminjam: 0,
    tanggal_pinjam: "1111-11-11",
    tanggal_kembali: "",
  });

  React.useEffect(() => {
    fectDataBuku();
    fectDataUser();
    // var tanggal =
    //   new Date().getFullYear() +
    //   "-" +
    //   new Date().getMonth() +
    //   "-" +
    //   new Date().getDate();
    // document.getElementById("tanggal_pinjam").value = tanggal;
    // document.getElementById("tanggal_kembali").value = tanggal;
    // console.log(tanggal.toString());
  }, []);

  const fectDataBuku = async () => {
    const response = await axios.get(
      "http://localhost:5154/api/Buku/Buku/getAllBuku"
    );
    const data = await response.data.data;
    setDatabuku(data);
    console.log(data);
  };

  const fectDataUser = async () => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5154/User/GetAllData",
      responseType: "json",
    });
    const data = await response.data.data;
    setDatauser(data);
    console.log(data);
  };

  // const handleChangeBuku = (event) => {
  //   setDatabuku({
  //     ...databuku,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  // const handleChangeUser = (event) => {
  //   setDatauser({
  //     ...datauser,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  // const handleChangeTanggal = (event) => {
  //   setTanggal({
  //     ...datatanggal,
  //     [event.target.name]: event.target.value,
  //   });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: name === "id" ? parseInt(value, 5) || "" : value,
    });
  };

  const handleSubmit = async () => {
    const formDataInput = new FormData();
    formDataInput.append("id", formValue.id);
    formDataInput.append("id_buku", formValue.id_buku);
    formDataInput.append("id_peminjam", formValue.id_peminjam);
    formDataInput.append("tanggal_pinjam", formValue.tanggal_pinjam);
    formDataInput.append("tanggal_kembali", formValue.tanggal_kembali);
    console.log(formValue);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5154/api/Histori/Histori/postHistori",
        data: formDataInput,
        headers: { "Content-Type": "application/json" },
      });
      alert("Data berhasil disimpan");
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
          <h1>Tambah Data Histori</h1>
        </div>
        <div className="conten mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 col-4">
              <label htmlFor="id_buku" className="form-label">
                <h5>Pilih nama buku :</h5>
              </label>
              <select
                className="form-select"
                name="id_buku"
                onChange={handleChange}
              >
                <option selected>Pilih Buku</option>
                {databuku.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.judul}
                    </option>
                  );
                })}
              </select>
              <br />
              <label htmlFor="id_peminjam" className="form-label">
                <h5>Pilih nama user :</h5>
              </label>
              <select
                onChange={handleChange}
                className="form-select"
                name="id_peminjam"
              >
                <option selected>Pilih User</option>
                {datauser.map(function (item) {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  );
                })}
              </select>
              <br />

              <label htmlFor="tanggal_kembali" className="form-label">
                <h5>Tanggal Kembali :</h5>
              </label>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="tanggal_kembali"
                  id="tanggal_kembali"
                  onChange={handleChange}
                />
              </div>
              <br />
              <br />
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
export default HistoriAdd;

// import axios from "axios";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function HistoriAdd() {
//     const [formValue, setformValue] = React.useState({
//         id: 0,
//         id_buku: "",
//         id_peminjam: "",
//         tanggal_pinjam: "",
//         tanggal_kembali: "",
//     });

//     const handleChange = (event) => {
//         setformValue({
//             ...formValue,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleSubmit = async () => {
//         const formDataInput = new FormData();
//         formDataInput.append("id", formValue.id);
//         formDataInput.append("id_buku", formValue.id_buku);
//         formDataInput.append("id_peminjam", formValue.id_peminjam);
//         formDataInput.append("tanggal_pinjam", formValue.tanggal_pinjam);
//         formDataInput.append("tanggal_kembali", formValue.tanggal_kembali);
//         console.log(formDataInput);
//         alert("Data berhasil disimpan");
//         try {
//             const response = await axios({
//                 method: "post",
//                 url: "http://localhost:5154/api/Histori/Histori/postHistori",
//                 data: formDataInput,
//                 headers: { "Content-Type": "application/json" },
//             });
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//             alert(error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="card p-5 shadow">
//                 <div className="Title">
//                     <h1>Tambah Data Peminjaman Buku</h1>
//                 </div>
//                 <div className="conten mt-4">
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3 col-4">
//                             <label htmlFor="id_buku" className="form-label">
//                                 <h5>Id Buku :</h5>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="id_buku"
//                                 placeholder="Masukkan id buku anda"
//                                 value={formValue.id_buku}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                             <br />
//                             <label htmlFor="id_peminjam" className="form-label">
//                                 <h5>Id User :</h5>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="id_peminjam"
//                                 placeholder="Masukkan id user anda"
//                                 value={formValue.id_peminjam}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                             <br />
//                             <label
//                                 htmlFor="tanggal_kembali"
//                                 className="form-label"
//                             >
//                                 <h5>Tanggal Pinjam :</h5>
//                             </label>
//                             <div className="input-group mb-3">
//                                 <input
//                                     type="date"
//                                     name="tanggal_kembali"
//                                     value={formValue.tanggal_kembali}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <label
//                                 htmlFor="tanggal_pinjam"
//                                 className="form-label"
//                             >
//                                 <h5>Tanggal Kembali :</h5>
//                             </label>
//                             <div className="input-group mb-3">
//                                 <input
//                                     type="date"
//                                     name="tanggal_pinjam"
//                                     value={formValue.tanggal_pinjam}
//                                     onChange={handleChange}
//                                     className="form-control"
//                                 />
//                             </div>
//                             <br />
//                             <br />
//                             <button type="submit" className="btn btn-success">
//                                 Simpan
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default HistoriAdd;
