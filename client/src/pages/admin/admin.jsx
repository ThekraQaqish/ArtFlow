import React, { useState, useEffect } from "react";
import axios from "axios";
import './admin.css';

const AdminWeeklyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
};

  useEffect(() => {
    fetchActiveChallenge();
  }, []);

  const fetchActiveChallenge = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/WeeklyChallenge", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setChallenge(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "start_date") {
        const start = new Date(value);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        setForm({
          ...form,
          start_date: value,
          end_date: end.toISOString().split("T")[0]
        });
      } 
      else if (name === "end_date") {
        const today = new Date();
        const end = new Date(value);

        if (end < today) {
          setError("End date cannot be in the past");
          return;
        }

        const start = new Date(end);
        start.setDate(end.getDate() - 7);
        setForm({
          ...form,
          end_date: value,
          start_date: start.toISOString().split("T")[0]
        });
      } 
      else {
        setForm({ ...form, [name]: value });
      }
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title || !form.description || !form.start_date || !form.end_date) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/admin/WeeklyChallenge", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setSuccess("Challenge created successfully");
      setForm({ title: "", description: "", start_date: "", end_date: "" });
      fetchActiveChallenge(); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating challenge");
    }
  };

  return (
    <div className="admin">
      <h2>Create Weekly Challenge</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Challenge</button>
      </form>
      
      <h3>Active Challenge</h3>
      {challenge ? (
        <div className="active-challenge" style={{background: '#f0f4f8', padding: '1rem', borderRadius: '8px'}}>
          <h4 style={{marginBottom: '0.5rem'}}>{challenge.title}</h4>
          <p style={{marginBottom: '1rem'}}>{challenge.description}</p>
          <p style={{fontWeight: 'bold', color: '#555'}}>
            From: <span style={{color:'#14c33cff'}}>{formatDate(challenge.start_date)}</span> &nbsp;&nbsp; 
            To: <span style={{color:'#fa0707ff'}}>{formatDate(challenge.end_date)}</span>
          </p>
        </div>
      ) : (
        <p>No active challenge</p>
      )}

    </div>
  );
};

export default AdminWeeklyChallenge;
