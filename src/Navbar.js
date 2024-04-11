import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <center>
      <div className="nav">
        <NavLink to="/Login1" activeclassname="active">
          Login
        </NavLink>
        <NavLink to="/Home" activeclassname="active">
          Home
        </NavLink>
        <NavLink to="/Enquiry" activeclassname="active">
          Enquiry
        </NavLink>
       </div>
    </center>
  );
}

export default Navbar;
