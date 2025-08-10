import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Artworks.css'

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 9;

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    artists: [],
    sortOptions: ["newest", "oldest", "popular", "commented"],
  });

  const [tempFilters, setTempFilters] = useState({
    categories: [],
    artist_ids: [],
    sort: "newest",
  });

  const [filters, setFilters] = useState({
    categories: [],
    artist_ids: [],
    sort: "newest",
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/artworks/filter-options",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {

          setFilterOptions(res.data.filterOptions);
        }
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
      }
    };

    fetchFilterOptions();
  }, []);
  useEffect(() => {
  if (searchTerm.trim() !== "") {
    setPage(1);
  }
}, [searchTerm]);


  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);

      try {
        let url;
        let params = {};
        
        if (searchTerm.trim() !== "") {

          url = "http://localhost:3000/api/artworks/search/artworks";
          params = { q: searchTerm.trim() };
        } else if (
          filters.categories.length === 0 &&
          filters.artist_ids.length === 0 &&
          filters.sort === "newest"
        ) {

          url = "http://localhost:3000/api/artworks/paginated";
          params = { page, limit };
        } else {

          url = "http://localhost:3000/api/artworks/filter";
          params = {
            page,
            limit,
            sort: filters.sort,
          };

          if (filters.categories.length > 0) {
            params.categories = filters.categories.join(",");
          }

          if (filters.artist_ids.length > 0) {
            params.artist_ids = filters.artist_ids.join(",");
          }
        }

        const res = await axios.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API response:", res.data);

        if (searchTerm.trim() !== "") {

          setArtworks(res.data.data || []);
          setTotalPages(1);
        } else {

          setArtworks(res.data.data || []);

          const totalItems = res.data.pagination?.total || 0;
          const itemsPerPage = res.data.pagination?.limit || limit;

          setTotalPages(Math.ceil(totalItems / itemsPerPage));
        }
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
        setError("Failed to load artworks. Please try again.");
        setArtworks([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page, filters, searchTerm]);

  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSelection = (key, id) => {
    const selected = tempFilters[key];
    if (selected.includes(id)) {
      handleTempFilterChange(
        key,
        selected.filter((i) => i !== id)
      );
    } else {
      handleTempFilterChange(key, [...selected, id]);
    }
  };

  const applyFilters = () => {
    setFilters({
      categories: [...tempFilters.categories],
      artist_ids: [...tempFilters.artist_ids],
      sort: tempFilters.sort,
    });
    setPage(1);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setTempFilters({
      categories: [],
      artist_ids: [],
      sort: "newest",
    });
    setFilters({
      categories: [],
      artist_ids: [],
      sort: "newest",
    });
    setPage(1);
    setSearchTerm("");
  };

  const handleArtworkClick = (artworkId) => {
    navigate(`/artworks/${artworkId}/manage`);
  };

  return (
    <div className="artworks-container">
  <h1>Discover Unique Artworks from Talented Artists</h1>

  <div className="search-filters-wrapper">
    <input
      type="text"
      className="search-input"
      placeholder="Search artworks or artists..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="btn btn-filter" onClick={() => setShowFilters(true)}>
      Filters ⚙️
    </button>
    <button className="btn btn-reset" onClick={resetFilters}>
      Reset
    </button>
  </div>

  {showFilters && (
    <div
      className="filters-modal-backdrop"
      onClick={() => setShowFilters(false)}
    >
      <div
        className="filters-modal"
        onClick={(e) => e.stopPropagation()}
      >
       <h2>Filters</h2>

        {/* قسم الفئات */}
        <div className="filter-section">
          <h4>Categories</h4>
          <div className="checkbox-list">
            {filterOptions.categories.map((category) => (
              <label key={category} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={tempFilters.categories.includes(category)}
                  onChange={() => toggleSelection("categories", category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* قسم الفنانين */}
        <div className="filter-section">
          <h4>Artists</h4>
          <div className="checkbox-list">
            {filterOptions.artists.map((artist) => (
              <label key={artist.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={tempFilters.artist_ids.includes(artist.id)}
                  onChange={() => toggleSelection("artist_ids", artist.id)}
                />
                <span>{artist.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* قسم ترتيب */}
        <div className="filter-section">
          <h4>Sort By</h4>
          <select
            className="select-sort"
            value={tempFilters.sort}
            onChange={(e) => handleTempFilterChange("sort", e.target.value)}
          >
            {filterOptions.sortOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>


        <div className="filters-actions">
          <button
            className="btn btn-cancel"
            onClick={() => setShowFilters(false)}
          >
            Cancel
          </button>
          <button className="btn btn-apply" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )}

  {/* شبكة الأعمال */}
  <div className="artworks-grid">
    {artworks.length === 0 && !loading ? (
      <div className="no-artworks-message">
        No artworks found. Try adjusting your filters or search term.
      </div>
    ) : (
      artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="artwork-card"
          onClick={() => handleArtworkClick(artwork.id)}
        >
          <img src={artwork.image_url} alt={artwork.name} />
          <div className="artwork-info">
            <h3>{artwork.name}</h3>
            <p>Artist: {artwork.artist_name || "Unknown"}</p>
            <p>Category: {artwork.category || "Uncategorized"}</p>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Pagination */}
  {totalPages > 1 && searchTerm.trim() === "" && (
    <div className="pagination-wrapper">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  )}

  {loading && <div className="loading-message">Loading artworks...</div>}
  {error && <div className="error-message">{error}</div>}
</div>

  );
};

export default Artworks;
