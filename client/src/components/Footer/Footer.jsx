import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className='footerContainer'>
                <div className="footerLogo">
                    <img src="/images/logo.png" alt='Thekra Logo' />
                </div>

                <div className='footerLinks'>  
                    <Link to='/'>Home</Link>
                    <Link to='/Artworks'>Artworks</Link>
                    <Link to='/Artists'>Artists</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact</Link>
                </div>

                <div className="footerIcons">
                    <a href='https://github.com/ThekraQaqish' target='_blank' rel='noreferrer'>
                        <img src='/images/github.png' alt='GithubIcon' />
                    </a>
                    <a href='https://www.linkedin.com/in/thekra-qaqish/' target='_blank' rel='noreferrer'>
                        <img src='/images/L.png' alt='LinkedinIcon' />
                    </a>
                </div>
            </div>
            <div className="footerCopy">
            <p>© 2023 ArtFlow. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
