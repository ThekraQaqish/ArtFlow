import React, { useState } from "react";
import './SubmissionForm.css';

const SubmissionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !imageUrl) {
      alert("Please fill all fields.");
      return;
    }

    onSubmit({ title, description, image_url: imageUrl });

    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <h2 >Don’t miss the chance to participate!</h2>

      <label >Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label >Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label >Image URL</label>
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SubmissionForm;
