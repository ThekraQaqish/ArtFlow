import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      <img src={profile.pp || "https://www.gravatar.com/avatar/?d=mp&f=y"} alt="Profile" width="100" />
      <h1>{profile.name}</h1>
      <p>{profile.bio || "No bio yet"}</p>
      {/* <p>Username: {profile.username}</p>
      <p>Role: {profile.role}</p> */}
      <button onClick={() => navigate('/messages', { state: { activeUserId: profile.id } })}>
       Get in Touch with {profile.name}
      </button>


      <p>Total artworks: {profile.total_artworks || 0}</p>
      <h2>Artworks</h2>
      {profile.artworks && profile.artworks.length > 0 ? (
        <div className="artworks-grid">
          {profile.artworks.map((art) => (
            <div key={art.id} className="artwork-card">
              <img src={art.image_url} alt={art.title} className="artwork-image" />
              <div className="artwork-info">
                <h3>{art.title}</h3>
                <p>{art.description}</p>
                <p className="likes">Likes: {art.likes_count}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No artworks yet</p>
      )}

    </div>
  );
};

export default UserProfile;
