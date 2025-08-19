import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="ml-8 space"></div>

        <div className="button">
          <Link to="/new" className="btn btn-success ">
            Add new contact
          </Link>

          
        </div>
      </div>
    </nav>
  );
};
