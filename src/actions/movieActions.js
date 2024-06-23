// Replace 'YOUR_API_KEY' with your actual TMDB API key
const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2EzMGU1ZTdjMGYzMjY0ODNhMmU2MTRiNjExMjZkNyIsIm5iZiI6MTcxOTEyNzU0OC42MTgzNTEsInN1YiI6IjY2NzdjY2ZmYjY1ZGRiZjNhYTczMjI3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7MzL6NzaWpfAl7lIlDB6tc9uMWAUzEL4jQ6wZfNnFI";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchMoviesSuccess(data.results));
      } else {
        dispatch(fetchMoviesFailure(data.status_message));
      }
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};
