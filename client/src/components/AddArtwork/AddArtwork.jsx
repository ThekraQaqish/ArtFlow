import './AddArtwork.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const AddArtwork = () =>{
    const navigate = useNavigate();

    const [image_url,setImage_url]= useState('');
    const [name,setName]= useState('');
    const [description,setDescription]= useState('');
    const [artwork_date, setArtwork_date]= useState('');
    const [categories, setCategories]= useState([]);
    const [category, setCategory] = useState('');


    useEffect(() => {
        axios.get('http://localhost:3000/api/artworks/filter-options')
            .then(res => {
            if (res.data.success) {
                setCategories(res.data.filterOptions.categories);
            }
            })
            .catch(err => console.error(err));
        }, []);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = { image_url, name, description, artwork_date, category };
        try {
            const response=await axios.post('http://localhost:3000/api/artworks',data,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            });
            toast.success('Artwork uploaded successfully');
            const newArtworkId = response.data.id; 
            if (newArtworkId) {
                navigate(`/artworkDetails/${newArtworkId}`);
                } else {
                toast.error('Failed to get new artwork ID');
                }
            
        } catch (error) {
            toast.error('Error uploading artwork');
            console.log(error);
        }
    }
    return(
        <div className='add-artwork'>
            <h2>Share Your Creativity with the World</h2>
            <p>Upload your artwork and inspire others. Whether it’s a sketch, painting, or digital masterpiece — your art deserves to be seen.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Image_url' onChange={(e)=>{setImage_url(e.target.value)}}/>
                <input type="text" placeholder='Title' onChange={(e)=>{setName(e.target.value)}}/>
                <textarea placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                <input type="date" placeholder='Date' onChange={(e)=>{setArtwork_date(e.target.value)}}/>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                <button >Upload</button>
            </form>
        </div>
    )
}
export default AddArtwork;