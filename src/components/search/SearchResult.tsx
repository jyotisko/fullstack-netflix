import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchContext } from './../../contexts/SearchContext';
import { instance as axios } from './../../utils/requests';
import Movie from './../utils/Movie';
import Spinner from './../utils/Spinner';

const SearchResults: React.FC = () => {

  interface Movies {
    _id: string,
    name: string,
    posterImageURL: string,
    backdropImageURL: string,
    description: string,
    rating: number,
    genre: string,
    isPremium: boolean,
    createdAt: Date | String,
    videoURL: string
  };

  const [search,] = useContext(SearchContext);
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState<true | false>(false);

  useEffect(() => {
    (async () => {
      try {
        if (search.name.trim() === '') return;
        setMovies([]);
        setIsLoading(true)
        const { data } = await axios.get(`/movies?name=${search.name}&genre=${search.type}`);
        const moviesFromAPI = data.data.movies;
        if (moviesFromAPI.length === 0) {
          setIsLoading(false);
          return toast.error('Unable to find that movie!', { id: 'no-movies-toast', duration: 5000 });
        }
        setMovies(moviesFromAPI);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.message.includes('timeout')) return toast.error('Request Time Out! Please check your internet connection.', { id: 'timeout-search', duration: 5000 });
      }
    })();
  }, [search]);

  return (
    <>
      <div className="results">
        {isLoading && <Spinner />}
        {
          movies.length > 0 && (
            <>
              {
                movies.map(movie => <Movie key={movie._id} movie={movie} bigPoster={true} />)
              }
            </>
          )
        }
      </div>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default SearchResults;