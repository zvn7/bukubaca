import React, { Component } from "react";
// import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="card p-5 shadow">
                    <div className="Title">
                        <h1>Dashboard Buku Baca</h1>
                    </div>
                    <div className="content">
                        <p>Sistem Manajemen Perpustakaan</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
