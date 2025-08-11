import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className='navbar'>
            <div className='navbarContainer'>
                <NavLink to='/' className={({ isActive }) => isActive ? "active-link navbarLogo" : "navbarLogo"}>ArtFlow</NavLink>
                <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
                <NavLink to='/Artworks' className={({ isActive }) => isActive ? "active-link" : ""}>Artworks</NavLink>
                <NavLink to='/Artists' className={({ isActive }) => isActive ? "active-link" : ""}>Artists</NavLink>
                <NavLink to='/WeeklyChallenge' className={({ isActive }) => isActive ? "active-link" : ""}>Weekly Challenge</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>

                <div className="profileMenu" ref={modalRef}>
                    <button onClick={() => setShowModal(!showModal)}>
                        <img src='/images/profile.png' alt="User Icon" />
                    </button>

                    {showModal && (
                        <div className="dropdownMenu">
                            <button onClick={() => { setShowModal(false); navigate("/Profile"); }}>View Profile</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
