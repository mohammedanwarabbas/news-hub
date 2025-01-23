// fetchNewsData: A function that fetches news articles from multiple sources (NewsAPI, Guardian, NYTimes) based on the provided search query and selected sources.
// It handles API requests, data mapping, and filtering out unwanted articles. The results are returned in a shuffled order.

import axios from "axios";

// Define constants for the API URLs of different news sources
const NEWSAPI_URL = "https://newsapi.org/v2/everything";
const GUARDIAN_URL = "https://content.guardianapis.com/search";
const NYT_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// API keys for each news source stored in environment variables
const NEWSAPI_KEY = process.env.REACT_APP_NEWSAPI_KEY!;
const GUARDIAN_KEY = process.env.REACT_APP_GUARDIAN_API_KEY!;
const NYT_KEY = process.env.REACT_APP_NYT_API_KEY!;

// Type definition for a news article
interface NewsArticle {
  title: string;
  source: string;
  imageUrl: string | null;
  url: string | null;
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string | null;
}

// Type definition for the parameters required to fetch news
interface FetchParams {
  query: string;
  page: number;
  sources: string[];
}

// Create an axios instance with a timeout of 30 seconds for all requests
const axiosInstance = axios.create({
  timeout: 30000, // Set a 30-second timeout for all requests
});

// Function to fetch news articles from the NewsAPI
const fetchNewsData = async ({
  query,
  page,
  sources,
}: FetchParams): Promise<NewsArticle[]> => {
  // Fetch data from NewsAPI
  const fetchNewsAPI = async () => {
    try {
      const { data } = await axiosInstance.get(NEWSAPI_URL, {
        // NewsApi require any one of these parameter should be exits with the data - q, qInTitle, sources, domains. so if user clear search box, then query becomes empty, for that reason sources parameteer is used
        params: {
          q: query,
          page,
          pageSize: 10,
          apiKey: NEWSAPI_KEY,
          sources: `cnn,bbc-news`,
        },
      });
      // console.log(data)
      return data.articles.map((article: any) => ({
        title: article.title,
        source: "NewsAPI",
        imageUrl:
          article.urlToImage ||
          `/assets/img/img${Math.floor(Math.random() * 6) + 1}.jpg`,
        url: article.url || null,
        author: article.author || null,
        content: article.content || null,
        description: article.description || null,
        publishedAt: article.publishedAt || null,
      }));
    } catch (error: any) {
      console.error("Error fetching from NewsAPI:", error.message);
      return [];
    }
  };

  // Fetch data from Guardian API
  const fetchGuardianAPI = async () => {
    try {
      const { data } = await axiosInstance.get(GUARDIAN_URL, {
        params: {
          q: query,
          page,
          "api-key": GUARDIAN_KEY,
          "show-fields": "headline,thumbnail,body,short-url,description",
        },
      });
      return data.response.results.map((result: any) => ({
        title: result.webTitle,
        source: "Guardian",
        imageUrl:
          result.fields?.thumbnail ||
          `/assets/img/img${Math.floor(Math.random() * 6) + 1}.jpg`,
        url: result?.webUrl || null,
        author: result?.byline || null,
        content: result.fields?.body || null,
        description: result.fields?.description || null,
        publishedAt: result?.webPublicationDate || null,
      }));
    } catch (error: any) {
      console.error("Error fetching from Guardian API:", error.message);
      return [];
    }
  };

  // Fetch data from New York Times API
  const fetchNYTAPI = async () => {
    try {
      const { data } = await axiosInstance.get(NYT_URL, {
        params: { q: query, page, "api-key": NYT_KEY },
      });
      return data.response.docs.map((doc: any) => ({
        title: doc.headline.main,
        source: "NYTimes",
        imageUrl:
          doc.multimedia.length > 0
            ? `https://www.nytimes.com/${doc.multimedia[0].url}`
            : `/assets/img/img${Math.floor(Math.random() * 6) + 1}.jpg`,
        url: doc.web_url || null,
        author: doc.byline?.original || null,
        content: doc.abstract || null,
        description: doc.snippet || null,
        publishedAt: doc.pub_date || null,
      }));
    } catch (error: any) {
      console.error("Error fetching from NYT API:", error.message);
      return [];
    }
  };

  // Function to fetch data from selected sources based on user preference
  const fetchFromSelectedSources = async () => {
    const promises: Promise<NewsArticle[]>[] = [];

    // If no sources are selected, fetch from all sources
    if (sources.length === 0) {
      promises.push(fetchNewsAPI());
      promises.push(fetchGuardianAPI());
      promises.push(fetchNYTAPI());
    } else {
      // Otherwise, fetch only from selected sources
      if (sources.includes("NewsAPI")) {
        promises.push(fetchNewsAPI());
      }
      if (sources.includes("Guardian")) {
        promises.push(fetchGuardianAPI());
      }
      if (sources.includes("NYTimes")) {
        promises.push(fetchNYTAPI());
      }
    }

    // Wait for all selected sources to fetch data
    const results = await Promise.all(promises);

    // Flatten the results
    const combinedResults = results.flat();

    // Filter out articles with the title "[Removed]" (only for NewsAPI results), because some NewsAPI result consist of articles with the title = [Removed]
    const validResults = combinedResults.filter((article) => {
      return !(article.source === "NewsAPI" && article.title === "[Removed]");
    });

    return validResults;
  };

  const articles = await fetchFromSelectedSources();

  // Shuffle the combined array randomly, so user can see results from all 3 APIs randomly
  const shuffledResults = articles.sort(() => Math.random() - 0.5);
  return shuffledResults;
};

export default fetchNewsData;
