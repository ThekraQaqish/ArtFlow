import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./ArtworkManage.css";

const ArtworkManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    category: "",
    artwork_date: ""
  });

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/artworks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setData(res.data);
      setForm({
        name: res.data.name || "",
        description: res.data.description || "",
        image_url: res.data.image_url || "",
        category: res.data.category || "",
        artwork_date: res.data.artwork_date || ""
      });
    } catch (error) {
      toast.error("Failed to fetch artwork");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/artworks/${id}`,
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setData(res.data);
      setEditMode(false);
      toast.success("Artwork updated successfully");
    } catch (error) {
      toast.error("Failed to update artwork");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/artworks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Artwork deleted");
      navigate("/artworks");
    } catch (error) {
      toast.error("Failed to delete artwork");
    }
  };

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="artwork-manage">
      <Toaster />
      {!editMode ? (
        <div className="artwork-view">
          <h1>{data.name}</h1>
          <p><em>By: {data.artist_name}</em></p>
          <img src={data.image_url} alt={data.name} />
          <p>{data.description}</p>
          <p>{data.category}</p>
          <p>{data.artwork_date}</p>
          <div className="buttons">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div className="artwork-edit">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
          <input type="date" name="artwork_date" value={form.artwork_date} onChange={handleChange} />
          <div className="buttons">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkManage;
