import { useEffect, useState } from 'react';
import { instance as axios } from './../../utils/requests';
import Movie from '../utils/Movie';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../utils/Spinner';

interface Props {
  title: string,
  fetchUrl: string,
  bigPoster: boolean
}

const MovieRow: React.FC<Props> = ({ title, fetchUrl, bigPoster }) => {

  interface Movies {
    name: string,
    posterImageURL: string,
    backdropImageURL: string,
    description: string,
    rating: number,
    genre: string,
    isPremium: boolean,
    createdAt: Date | String
  };

  const [movies, setMovies] = useState<Movies[] | []>([]);
  const [isLoading, setIsLoading] = useState<true | false>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(fetchUrl);
        const movies = data.data.movies;
        setMovies(movies);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.message.includes('timeout')) return toast.error('Request Time Out! Please check your internet connection.', { id: 'timeout-row', duration: 5000 });
      }
    })();
  }, []);

  return (
    <>
      <div className="row">
        <h2 className="row__title">{title}</h2>
        {isLoading && <Spinner />}
        <div className="row__movies">
          {
            movies.length > 0 && movies.map((movie: any) => (
              <Movie key={movie._id} movie={movie} bigPoster={bigPoster} />
            ))
          }
        </div>
      </div>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default MovieRow;