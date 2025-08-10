import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Artists.css'; 

const Artists = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (query = '', pageNum = 1) => {
    setLoading(true);
    try {
      let url = `http://localhost:3000/api/users/artists/paginated?page=${pageNum}&limit=9`;

      if (query.trim() !== '') {
        url = `http://localhost:3000/api/users/artists/search?q=${encodeURIComponent(query)}&page=${pageNum}&limit=9`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const artists = response.data.data || response.data;
      setData(artists);

      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.page);
      }
    } catch (error) {
      console.error("Failed to fetch artists:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(searchTerm, page);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="artists-container">
      <h1>Artists</h1>
      <input
        type="text"
        placeholder="Search artists..."
        value={searchTerm}
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
        className="artists-search-input"
      />

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <div className="artists-list">
          {data.map((artist, index) => (
            <div key={index} className="artist-card">
              {artist.pp ? (
                <img
                  src={artist.pp}
                  alt={artist.name}
                />
              ) : (
                <img
                  src="https://th.bing.com/th/id/OIP.4A4iwzRKJEz5nWjYh8rwDwHaHa?w=217&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="default avatar"
                />
              )}
              <h3>{artist.name}</h3>
              <p>{artist.bio}</p>
              <button onClick={() => navigate(`/user/${artist.id}`)}>View Profile</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Artists;
