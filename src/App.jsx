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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKey } from "./hooks/useKey";

export default function App() {
  const [query, setQuery] = useState("spider man");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorage("WatchedList");

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

  useKey("Escape",handleCloseMovie)

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
