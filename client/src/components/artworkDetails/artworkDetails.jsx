import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './artworkDetails.css';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ArtworkDetails=()=>{
    const {id}=useParams();
    const [data,setData]=useState(null);
    
    useEffect( ()=>{
        const fetchArtwork = async ()=>{

            try {
            const response = await axios.get(`http://localhost:3000/api/artworks/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }});
            setData(response.data);

        } catch (error) {
            console.log(error);
            toast.error('Can not get the artwork');
            
        }
        }
        fetchArtwork();
    },[id])
     if (!data) return <div>Loading...</div>;
    return (
  <div className="artwork-details">
    <h1>{data ? data.name : 'Loading...'}</h1>
    <p><em>By: {data ? data.artist_name : 'Loading...'}</em></p>


    <img src={data?.image_url || 'placeholder-image-url.jpg'} alt={data?.name || 'Artwork'} />
        <p>{data?.description || "No description provided."}</p>
        <p>{data?.category || "No category specified."}</p>


    <section>
      <h3>Description</h3>
      <p>{data.description || "No description provided."}</p>
    </section>

    <section>
      <h3>Category</h3>
      <p>{data.category || "No category specified."}</p>
    </section>
  </div>
);

}
export default ArtworkDetails;