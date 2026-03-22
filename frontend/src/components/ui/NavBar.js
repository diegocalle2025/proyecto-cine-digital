import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_navbar.png';

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark glass-navbar">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/media">Películas y Series</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/generos">Géneros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/directores">Directores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/productoras">Productoras</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/tipos">Tipos</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
