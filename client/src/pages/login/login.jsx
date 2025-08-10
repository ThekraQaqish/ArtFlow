import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './login.css';
const Login =()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSignIn = async(e)=>{
        e.preventDefault();
        try {
            const data =await authService.login(email,password);
            localStorage.setItem('token',data.token);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Sign in failed. Please try again.')
        }
    }

    return(
        <div className="login-container">
            
            <div className="login-left">
                <h2>Welcome back to your creative space</h2>
                <p>Log in to showcase your art, connect with other artists, and get inspired</p>

                <form onSubmit={handleSignIn}>
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button>Sign In</button>
                </form>
            </div>
            
            <div className="login-right">
            </div>
        </div>
    )
}
export default Login;