import React, { useEffect, useState } from "react";
import axios from "axios";
import ChallengeHeader from "../../components/ChallengeHeader/ChallengeHeader";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import Gallery from "../../components/Gallery/Gallery";
import './WeeklyChallenge.css';

const WeeklyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered")
    fetchChallenge();
    fetchSubmissions();
  }, []);

  const fetchChallenge = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/WeeklyChallenge",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
          });
      console.log("data",data);

      setChallenge(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/WeeklyChallenge/submissions",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
      }
        
      );
      setSubmissions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async ({ email, title, description, image_url }) => {
    try {
      const { data: newSubmission } = await axios.post("http://localhost:3000/api/WeeklyChallenge/submissions", 
        {
        title,
        description,
        image_url},
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
      });
      setSubmissions((prev) => [newSubmission, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit submission.");
    }
  };

  const handleLoadMore = () => {
    console.log("Load more clicked");
  };

  return (
    <div className="weekly-challenge-container">

      {challenge && (
        <div className="challenge-header">
          <ChallengeHeader
            title={challenge.title}
            description={challenge.description}
            startDate={challenge.start_date}
            endDate={challenge.end_date}
          />  
        </div>
      )}
      <div className="centered-content">
      <div className="submission-form">
        <SubmissionForm onSubmit={handleFormSubmit} />
      </div>
      </div>
      <div className="gallery-wrapper">
      <div className="gallery-container">
        <Gallery submissions={submissions} onLoadMore={handleLoadMore} />
      </div>
      </div>
    </div>
  );
};

export default WeeklyChallenge;
