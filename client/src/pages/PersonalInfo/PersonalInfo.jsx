import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PersonalInfo.css';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    pp: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setForm({
          name: data.name || "",
          username: data.username || "",
          bio: data.bio || "",
          pp: data.pp || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:3000/api/users/profile", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="personalform">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
      <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Enter your username" />
      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Your bio" />
      <input type="text" name="pp" value={form.pp} onChange={handleChange} placeholder="Profile picture URL" />
      <div className="b">
      <button type="submit">Update profile</button>
      <button type="button" onClick={() => navigate("/Profile")}>Cancel</button>
      </div>
    </form>
  );
};

export default EditProfile;
