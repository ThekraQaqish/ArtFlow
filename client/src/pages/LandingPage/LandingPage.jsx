import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Discover and Share Amazing Artworks</h1>
          <p className="hero-subtitle">
            Explore inspiring creations from talented artists around the world.
            Upload your own artwork, connect with creatives, and grow your audience.
          </p>
          <Link to="/get-started" className="join-button">
            Join Now
          </Link>
        </div>
      </section>

      <section className="story">
        <h2>Every Stroke Tells a Story</h2>
        <p>
          “Dive into a world where every brushstroke captures emotion, history, and imagination.
          Join our community and let your art speak.”
        </p>
      </section>

      <section className="why-choose-us">
        <h3>Why Choose Us?</h3>
        <div className="cards">
          <div className="card">
            <h4>Artists</h4>
            <p>Connect with creative minds worldwide.</p>
          </div>
          <div className="card">
            <h4>Art Works</h4>
            <p>Showcase your talent to a global audience.</p>
          </div>
          <div className="card">
            <h4>Community</h4>
            <p>Be part of an inspiring art community.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
