import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './register.css';

const Register =()=>{
    const [name,setName]= useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSignUp = async(e)=>{
        e.preventDefault();
        try {
            await authService.register(name,email,password);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.')
        }
    }


    return(
        <div className="register-container">
            <div className="register-left">
                <h2> Join Artists Community</h2>
                <p>Create your profile, share your artwork, and grow with fellow creatives</p>
                <form onSubmit={handleSignUp}>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="register-right">
            </div>
        </div>
    )
}
export default Register;