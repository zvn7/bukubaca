import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./menu/Menu";
import Dashboard from "./pages/Dashboard/Index";
import Buku from "./pages/Buku/Buku";
import BukuAdd from "./pages/Buku/BukuAdd";
import BukuEdit from "./pages/Buku/BukuEdit";
import BukuDelete from "./pages/Buku/BukuDelete";
import Histori from "./pages/Histori/Histori";
import HistoriAdd from "./pages/Histori/HistoriAdd";
import HistoriEdit from "./pages/Histori/HistoriEdit";
import HistoriDelete from "./pages/Histori/HistoriDelete";
import Users from "./pages/Users/User";
import UsersAdd from "./pages/Users/UserAdd";
import UsersEdit from "./pages/Users/UserEdit";
import UsersDelete from "./pages/Users/UserDelete";

function App() {
    return (
        <Router basepath="./my-app">
            <div className="app-header">
                <Menu />
            </div>
            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/buku" element={<Buku />} />
                    <Route path="/buku/add" element={<BukuAdd />} />
                    <Route path="/buku/edit/:id" element={<BukuEdit />} />
                    <Route path="/buku/delete/:id" element={<BukuDelete />} />
                    <Route path="/histori" element={<Histori />} />
                    <Route path="/histori/add" element={<HistoriAdd />} />
                    <Route path="/histori/edit/:id" element={<HistoriEdit />} />
                    <Route path="/histori/delete/:id" element={<HistoriDelete />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add" element={<UsersAdd />} />
                    <Route path="/users/edit/:id" element={<UsersEdit />} />
                    <Route path="/users/delete/:id" element={<UsersDelete />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
