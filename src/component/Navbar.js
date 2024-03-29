import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand text-warning">
                    Tuition Payment 
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student" className="nav-link">
                                Student
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/officer" className="nav-link">
                                Officer
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/class" className="nav-link">
                                Class
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tuition" className="nav-link">
                                Tuition
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/payment" className="nav-link">
                                Payment
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
