import { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { FaAngleRight } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { instance as axios, requests } from '../../utils/requests';
import Spinner from './../utils/Spinner';
import closeIcon from './../../assets/close.svg';

const Header: React.FC = () => {

  interface Movie {
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

  const defaultWordLimit = 40;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isOpened, setIsOpened] = useState<true | false>(false);
  const [isLoading, setIsLoading] = useState<true | false>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<true | false>(false);
  const [wordLimit, setWordLimit] = useState(defaultWordLimit);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(requests.fetchOriginals);
        const movies = data.data.movies;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.name.includes('timeout')) return toast.error('Request Timed Out! Please check your internet connection.', { id: 'timeout-header', duration: 5000 });
        if (!err.name.includes('timeout')) return toast.error(`Something went wrong! ${err.message}`, { id: 'other-error-header', duration: 5000 });
      }
    })();
  }, []);

  const expand = () => {
    if (wordLimit === defaultWordLimit) setWordLimit(Number(movie?.description?.split(' ')?.length));
    if (wordLimit !== defaultWordLimit) setWordLimit(defaultWordLimit);
    document.querySelector('.expand')?.classList.toggle('expanded');
  };

  return (
    <>
      <header className="header__home" style={movie ? { backgroundImage: `url(${movie?.backdropImageURL})` } : { backgroundImage: '' }}>
        {isLoading && <Spinner />}
        {
          movie && (
            <>
              <div className="header__movie">
                <h1 className="header__movie__title">{movie.name}</h1>
                <h3 className="header__movie__paragraph">
                  {movie.description.split(' ').splice(0, wordLimit).join(' ')}
                  {movie.description.split(' ').length >= 40 && <button className='expand' onClick={expand}><FaAngleRight /></button>}
                </h3>
                <button onClick={() => setIsOpened(true)} className="header__movie__play">Play</button>
              </div>
            </>
          )
        }
      </header>

      {
        movie && isOpened && (
          <div className="movie-view">
            <div className="movie-view__content">
              <img onClick={() => setIsOpened(false)} src={closeIcon} alt="Close" />
              <div className="video-player">
                {isVideoLoaded || <Spinner />}
                <Youtube onReady={() => setIsVideoLoaded(true)} videoId={movie.videoURL.split('?v=')[1]} />
              </div>
              <div className="text-info">
                <h2 className="name">{movie.name}</h2>
                <p className="description">{movie.description}</p>
              </div>
            </div>
          </div>
        )
      }
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default Header;