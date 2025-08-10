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
    setForm({ ...form, [e.target.name]: e.target.value });
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
      <div className="active-challenge">
        <h4>{challenge.title}</h4>
        <p>{challenge.description}</p>
        <p>
          From: {challenge.start_date} To: {challenge.end_date}
        </p>
      </div>
    ) : (
      <p>No active challenge</p>
    )}

    </div>
  );
};

export default AdminWeeklyChallenge;
