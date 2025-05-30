import { useState, useEffect } from "react";
import Nav from "./components/nav";
import Logo from "./components/logo";
import Search from "./components/search";
import NumResult from "./components/numResult";
import Main from "./components/main";
import Box from "./components/box";
import ErrorMessage from "./components/errorMessage";
import FilmList from "./components/filmList";
import SelectedMovie from "./components/selectedMovie";
import WatchedDetails from "./components/watchedDetails";
import WatchedList from "./components/watchedList";
import Loader from "./components/loader";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function App() {
  const [query, setQuery] = useState("spider man");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem("WatchedList")) || [];
  });
  useEffect(
    function () {
      localStorage.setItem("WatchedList", JSON.stringify(watched));
    },
    [watched]
  );
  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError(data.Error);
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  function handleSelectMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        handleCloseMovie();
        console.log("close");
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [selectedId, handleCloseMovie]);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Nav>

      {/* Main Section */}
      <Main>
        {/* Movies List */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <FilmList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        {/* Selected Movie or Watched List */}
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedDetails watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
