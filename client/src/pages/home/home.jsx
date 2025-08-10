import { useEffect, useState } from "react";
import axios from "axios";
import AddArtwork from "../../components/AddArtwork/AddArtwork";
import { Link } from "react-router-dom";
import './home.css';
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [data, setData] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:3000/api/home", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;
    const handleArtworkClick = (artworkId) => {
    navigate(`/artworks/${artworkId}/manage`);
  };

  return (
    <div className="home">
      <header>
        <h1>ArtFlow</h1>
        <p>ArtFlow is a platform for artists to showcase their work and connect with the world.</p>
      </header>
      <section>
        <h1>Your gallery, your voice</h1>
        <p>Showcase your work and make your mark in the art world</p>
      </section>

      <section>
        <h2>Add Art Works</h2>
        <p>Showcase your art to the world</p>
        <p>Upload, organize, and share your latest creations with a growing art community</p>
        <button> <Link to="/uploadArtwork" element={<AddArtwork />}>Upload Artwork</Link></button>
      </section>

      <section>
        <h2>Most Popular Art Works</h2>
        <div>
          {data.MostPopularArtworks.map((artwork, idx) => {
            return(
            <div key={idx}>
              <img src={artwork.image_url} alt={artwork.name} />
              <h4>{artwork.name}</h4>
              <p>Artist: {artwork.artist_name}</p>
              <span>Category: {artwork.category}</span>
              <button onClick={() => handleArtworkClick(idx)}>View Artwork</button>
            </div>
            )
})}
        </div>
      </section>

      <section>
        <h2>Most Popular Artists</h2>
        <div className="xx">
          {data.MostPopularArtists.map((artist) => (
            <div key={artist.id}>
              <img 
                src={artist.pp && artist.pp.trim() !== "" ? artist.pp : "/images/profile.png"} 
                alt={artist.name} 
                style={{width: "150px", height: "150px", borderRadius: "50%"}} 
              />
              <h4>{artist.name}</h4>
              <p>{artist.bio}</p>
              <span>{artist.artworks_count} artworks</span>
              <button onClick={() => navigate(`/user/${artist.id}`)}>View Profile</button>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
