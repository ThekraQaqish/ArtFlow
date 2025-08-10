import { Link, useNavigate } from 'react-router-dom';
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
                <Link to='/' className='navbarLogo'>ArtFlow</Link>
                <Link to='/'>Home</Link>
                <Link to='/Artworks'>Artworks</Link>
                <Link to='/Artists'>Artists</Link>
                <Link to='/WeeklyChallenge'>Weekly Challenge</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>

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
