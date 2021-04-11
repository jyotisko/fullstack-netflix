import { useEffect, useState } from "react";
import Youtube from 'react-youtube';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from './../../firebase/firebase';
import Spinner from './Spinner';
import { instance as axios } from './../../utils/requests';
import closeIcon from './../../assets/close.svg';
import icons from './../../assets/icons.svg';

interface Props {
  movie: {
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
  },
  bigPoster: boolean,
};

const Movie: React.FC<Props> = ({ movie, bigPoster }) => {

  const [isOpened, setIsOpened] = useState<true | false>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<true | false>(false);
  const [isBookmarkProcessing, setIsBookmarkProcessing] = useState<true | false>(false);
  const [isBookmarked, setIsBookmarked] = useState<true | false>(false);

  useEffect(() => {
    (async () => {
      if (!auth.currentUser) return;
      try {
        setIsBookmarkProcessing(true);
        const { data } = await axios.get(`/bookmarks?userID=${auth.currentUser.uid}&movieID=${movie._id}`);
        if (data.data.bookmarks.length !== 0) setIsBookmarked(true);
        setIsBookmarkProcessing(false);
      } catch (err) {
        toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection.' : `Something went wrong\n${err.message}`);
      }
    })();
  }, []);

  const addBookmark = async () => {
    try {
      if (!auth.currentUser) throw new Error('You are not logged in!');
      await axios.post('/bookmarks', {
        accessToken: process.env.REACT_APP_ACCESS_TOKEN,
        movieID: movie._id,
        userID: auth.currentUser.uid
      });
      setIsBookmarked(true);
    } catch (err) {
      toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection.' : err.message);
    }
  };

  const deleteBookmark = async () => {
    try {
      if (!auth.currentUser) throw new Error('You are not logged in!');
      await axios.delete('/bookmarks', {
        data: {
          accessToken: process.env.REACT_APP_ACCESS_TOKEN,
          movieID: movie._id,
          userID: auth.currentUser.uid
        }
      });
      setIsBookmarked(false);
    } catch (err) {
      console.error(err)
      toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection.' : err.message);
    }
  };

  const handleBookmarkClick = async () => {
    try {
      setIsBookmarkProcessing(true);
      if (!isBookmarked) await addBookmark();
      if (isBookmarked) await deleteBookmark();
      setIsBookmarkProcessing(false);
    } catch (err) {
      setIsBookmarkProcessing(false);
      toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection.' : err.message);
    }
  };

  return (
    <>
      <div className="movie" onClick={() => setIsOpened(true)}>
        <img src={bigPoster ? movie.posterImageURL : movie.backdropImageURL} />
      </div>

      {
        isOpened && (
          <div className="movie-view">
            <div className="movie-view__content">
              <img onClick={() => setIsOpened(false)} src={closeIcon} alt="Close" />
              <h2 className="name">{movie.name}</h2>
              <p className="description">{movie.description}</p>
              <div className="video-player">
                {isVideoLoaded || <Spinner />}
                <Youtube onReady={() => setIsVideoLoaded(true)} videoId={movie.videoURL.split('?v=')[1]} />
              </div>
              <div className="bookmark">
                {
                  isBookmarkProcessing && <Spinner />
                }
                {
                  isBookmarkProcessing ? (
                    <button disabled onClick={handleBookmarkClick}>
                      <svg className='svg-bookmark'>
                        <use xlinkHref={`${icons}#icon-bookmark${isBookmarked ? '-fill' : ''}`} />
                      </svg>
                      <h5>Please wait...</h5>
                    </button>
                  ) : (
                    <button onClick={handleBookmarkClick}>
                      <svg className='svg-bookmark'>
                        <use xlinkHref={`${icons}#icon-bookmark${isBookmarked ? '-fill' : ''}`} />
                      </svg>
                      <h5>{isBookmarked ? 'Remove from' : 'Add to'} list</h5>
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default Movie;