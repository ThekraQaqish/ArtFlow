import React from "react";
import "./Gallery.css";

const Gallery = ({ submissions, onLoadMore }) => {
  return (
    <section >
      <h2>Participation Gallery</h2>
      <p >
        Browse the amazing artworks submitted by talented artists for this challenge.
        Click on any piece to learn more about the artist and their creative process.
      </p>

      <div className="submissions-container">
        {submissions.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <img
              src={item.image_url}
              alt={item.title}
            />
            <h3 >{item.title}</h3>
            <p >{item.description}</p>
          </div>
        ))}
      </div>

      {submissions.length > 0 && (
        <div>
          <button
            onClick={onLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
