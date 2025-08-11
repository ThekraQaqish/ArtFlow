import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css';

const PersonalInfo = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.setItem("user_id", data.id);

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="personal-info-container">
      <img src={profile.pp || "https://www.gravatar.com/avatar/?d=mp&f=y"} alt="Profile" width="100" />

      <h1>{profile.name}</h1>
      <p>{profile.bio || "No bio yet"}</p>

      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Total artworks: {profile.total_artworks}</p>
      <p>Likes: {profile.likes_count}</p>

      <button className="edit-profile-btn" onClick={() => navigate("/PersonalInfo")}>Edit Profile</button>
      <section className="artworks-section">
      <h2>My Artworks</h2>
      <div className="artworks-grid">
      {profile.artworks.length > 0 ? (
        profile.artworks.map((art) => (
          <div key={art.id} className="artwork-card">
            <h3>{art.title}</h3>
            <img src={art.image_url} alt={art.title} className="artwork-image"/>
            <p>{art.description}</p>
          </div>
        ))
      ) : (
        <p>No artworks yet</p>
      )}
      </div>
    </section>
    </div>
  );
};

export default PersonalInfo;
