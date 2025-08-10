import { Link } from "react-router-dom";
import "./GetStarted.css";

export default function GetStarted() {
  return (
    <div className="get-started">
      <h1>Welcome to ArtFlow</h1>
      <p>Choose your path to start your journey.</p>
      <div className="buttons">
        <Link to="/login" className="btn">I have an account</Link>
        <Link to="/register" className="btn btn-alt">I'm new here</Link>
      </div>
    </div>
  );
}
