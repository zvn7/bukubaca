import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./menu/Menu";
import Dashboard from "./pages/Dashboard/Index";
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
