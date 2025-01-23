/**
 * NewsFeed Component
 *
 * Displays news articles with features like:
 * - Search: Search for news by keyword.
 * - Source filtering: Filter articles by news sources (ex: NewsAPI, Guardian etc)
 * - Pagination: Navigate through pages.
 * - Dynamic fetching: Fetches articles from an API based on query, page, and filters.
 * - Loading state: Shows a spinner while loading.
 *
 * Key Components:
 * - NewsCard component: Displays articles in a card format.
 * - LoadingSpinner component: Indicates loading state.
 */
import React, { useEffect, useState, useRef, MutableRefObject, useDebugValue } from "react";
import fetchNewsData from "../../api/fetchNewsData";
import NewsCard from "./NewsCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Helmet } from "react-helmet";

// Array of available news sources for filtering
const sources = ["NewsAPI", "Guardian", "NYTimes"];

const NewsFeed: React.FC = () => {

  // display welcome message
  useEffect(()=>{
    alert("NewsAPI won't work on custom domains. It works only on localhost.");
  },[])

  // State variables
  const [query, setQuery] = useState<string>(""); // Default query
  const searchQueryInput : MutableRefObject<HTMLInputElement | null> = useRef(null); // access dom element query input
  const [articleCache, setArticleCache] = useState<any[]>([]); // Cached articles for pagination
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page in pagination
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls
  const [error, setError] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]); // Selected sources for filtering

  // Fetch articles whenever query, currentPage, or selectedSources changes
  useEffect(() => {
    const fetchData = async () => {
      if ((currentPage - 1) * 10 < articleCache.length) {
        // Skip fetching if the data for the current page is already in the cache
        return;
      }

      try {
        setLoading(true); // Set loading to true after API call inorder to display loading animation
        const newArticles = await fetchNewsData({
          query,
          page: currentPage,
          sources: selectedSources,
        });
        setArticleCache((prevCache) => [...prevCache, ...newArticles]); // Add new articles to the cache
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching news."); // Handle API errors
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    fetchData();
  }, [query, currentPage, articleCache.length, selectedSources]);

  // Handle search form submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Extract form data
    const searchQuery = formData.get("search") as string;
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim());
      setCurrentPage(1); // Reset to the first page
      setArticleCache([]); // Clear cache for new search
    }
  };

  //if user clears the serach query input, the data should be loaded from the beginning
  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "" && query != "") {
      setQuery(""); // reset state
      setCurrentPage(1); // Reset to the first page
      setArticleCache([]); // Clear cache for new search

    }
  }

  // if user click clear button to clear search query input
  const handleOnSearcClear = () => {
    // change search text in the input field
    if (searchQueryInput.current){searchQueryInput.current.value=''}
    // load data from beginning
    setQuery(""); // reset state
    setCurrentPage(1); // Reset to the first page
    setArticleCache([]); // Clear cache for new search
  }


  // Handle source filter changes (ex:NYTimes, NewsAPI etc)
  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const source = event.target.value;
    if (event.target.checked) {
      setSelectedSources((prevSources) => [...prevSources, source]);
    } else {
      setSelectedSources((prevSources) =>
        prevSources.filter((s) => s !== source)
      );
    }
    setCurrentPage(1); // Reset to first page when filter changes
    setArticleCache([]); // Clear cache when source changes
  };

  // Load the next page of articles
  const loadNextPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Load the previous page of articles
  const loadPreviousPage = () => {
    if (!loading && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Get articles for the current page from the cache
  const paginatedArticles = articleCache.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <>
      <Helmet>
        <title>News Hub | News Feed</title>
      </Helmet>
      <div className="container my-4">
        {/* Page title */}
        <h1 className="text-center text-danger mb-4">News Feed</h1>

        {/* Search and Source Filter section */}
        <form
          onSubmit={handleSearch}
          className="mb-4 row d-flex align-items-center"
        >
          {/* Search Bar */}
          <div className="col-12 col-md-8 mb-3 mb-md-0">
            <div className="input-group">
              <input
              ref={searchQueryInput}
                type="text"
                name="search"
                className="form-control border border-danger"
                placeholder="Search news articles..."
                onChange={handleSearchOnChange}
              />
              <button type="submit" className="btn btn-danger ms-1">
                Search
              </button>
            </div>
          </div>

          {/* Source Filter Section */}
          <div className="col-12 col-md-4">
            <div className="d-flex justify-content-between flex-wrap source-filter">
              {sources.map((source) => (
                <div key={source} className="form-check form-check-inline text-dark">
                  <input
                    className={`form-check-input border border-danger ${selectedSources.includes(source)?'bg-danger':''}`}
                    type="checkbox"
                    value={source}
                    onChange={handleSourceChange}
                    checked={selectedSources.includes(source)}
                    id={source}
                  />
                  <label className="form-check-label" htmlFor={source}>
                    {source}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* loader */}
        {loading && <LoadingSpinner />}

        {/* pagination */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <button
            className="btn btn-secondary"
            onClick={loadPreviousPage}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          {/* display current page */}
          <span>Page {currentPage}</span>
          <button
            className="btn btn-secondary"
            onClick={loadNextPage}
            disabled={loading}
          >
            Next
          </button>
        </div>

        {/* preview search query (ex: displaying ressults for asteroid) */}
        {query && (
          <div className="d-flex justify-content-center align-items-center mb-4">
            <p className="d-fle">
              Search results for : {query} <button type="button" className="btn-close ms-2 align-middle border border-4 small border-danger" onClick={handleOnSearcClear}></button>
            </p>
          </div>
        )}


        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && paginatedArticles.length === 0 && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
              viewBox="0 0 16 16"
              role="img"
              aria-label="Warning:"
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
              No articles available for this page (try with other query/source)
            </div>
          </div>

        )}

        {/* display news cards */}
        {!loading && !error && (
          <div className="row g-4 d-flex justify-content-center">
            {paginatedArticles.map((article, index) => (
              <NewsCard article={article} key={index} />
            ))}
          </div>
        )}

        {/* Pagination controls */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={loadPreviousPage}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            className="btn btn-secondary"
            onClick={loadNextPage}
            disabled={loading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
