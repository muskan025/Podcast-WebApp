import React from 'react'
import './styles.css'
import { Link,useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import Button from '../Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';

const Header = () => {
  const location=useLocation();
  const currentPath=location.pathname;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
   return (
    <div className="navbar">
      <div className="gradient"></div>
     <div className="header-sect">
     <h2 className="pod-name">ProdPulse.</h2>
     <div className="links" >
      
        <Link to="/" className={currentPath==="/"?"active":""}>Home</Link>
        <Link
          to="/podcasts"
          className={currentPath === "/podcasts" ? "active" : ""}
        >
          Podcast
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath === "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : ""}
        >
          Profile
        </Link>

        {currentPath === "/profile" ?
        <button
         onClick={handleLogout}
         className='auth logout'
         >
          Logout
         </button>
          :""
        }

        {currentPath === "/" ?
        <>
        <Link to="/signup" className={currentPath === "/signup" ? "active" : "auth"}>
        Signup
      </Link>
      <Link to="/login" className={currentPath==="/login"?"active":"auth"}>
      Login</Link></>:
      ""
      }
 
      </div>

     </div>
    </div>
  );
}

export default Header