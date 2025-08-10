import React, { useState } from "react";
import axios from "axios";
import './Contact.css'

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ success: false, message: "Please fill all fields." });
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/contactUs", form);
      setStatus({ success: true, message: "Message sent successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        success: false,
        message: error.response?.data?.message || "Failed to send message."
      });
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      {status.message && (
        <p style={{ color: status.success ? "green" : "red" }}>
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
          />
        </div>

        <div>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>

        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
