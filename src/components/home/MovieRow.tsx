import { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
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

  const handleScroll = (e: any) => {
    const rowMovies = e.target.closest('.row__movies');
    const imageWidth = rowMovies.querySelector('img').width;

    const windowWidth = window.innerWidth;
    let scrollPixels;

    if (windowWidth >= 1450) {
      scrollPixels = imageWidth * 5;
    } else if (windowWidth >= 1000) {
      scrollPixels = imageWidth * 3;
    } else if (windowWidth >= 500 && windowWidth <= 1000) {
      scrollPixels = imageWidth * 2;
    } else {
      scrollPixels = imageWidth;
    }

    if (e.target.closest('.arrow').classList.contains('arrow--left')) {
      rowMovies.scrollLeft -= scrollPixels;
    }
    if (e.target.closest('.arrow').classList.contains('arrow--right')) {
      rowMovies.scrollLeft += scrollPixels;
    }
  };

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
          <div onClick={e => handleScroll(e)} className="arrow arrow--left">
            <FaAngleLeft className="arrow__icon arrow__icon--left" />
          </div>
          {
            movies.length > 0 && movies.map((movie: any) => (
              <Movie key={movie._id} movie={movie} bigPoster={bigPoster} />
            ))
          }
          <div onClick={e => handleScroll(e)} className="arrow arrow--right">
            <FaAngleRight className="arrow__icon arrow__icon--right" />
          </div>
        </div>
      </div>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default MovieRow;