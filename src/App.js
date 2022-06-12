import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactInfoListComp from "./components/ContactInfoListComp";
import AddContactInfo from "./components/AddContactInfo";
import ContacInfo from "./components/ContacInfo";

function App() {
  return (
    <>
      <div>
        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/contacts" className="navbar-brand">
              bezKoder
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/contacts"} className="nav-link">
                  contacts
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<ContactInfoListComp />} />
              <Route path="/contacts" element={<ContactInfoListComp />} />
              <Route path="/add" element={<AddContactInfo />} />
              <Route path="/contacts/:id" element={<ContacInfo />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
