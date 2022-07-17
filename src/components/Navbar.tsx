import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/home">Learn Reactjs+ts with ASP.CORE.api</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/home">Home </a>
                        
                    </div>
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/demo-react-hock-form-val">Demo-Dynamic-form </a>
                        
                    </div>
                </div>
            </nav>





        </>
    )
}

export default Navbar