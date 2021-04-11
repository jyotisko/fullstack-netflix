import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { instance as axios } from './../../utils/requests';
import { AuthContext } from './../../contexts/AuthContext';
import { auth } from './../../firebase/firebase';
import Movie from './../utils/Movie';
import BackButton from './../utils/BackButton';
import Spinner from './../utils/Spinner';

const BookmarkList: React.FC = () => {

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

  const user = useContext(AuthContext);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movies[]>([]);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState<true | false>(false);
  const [isThereAnyBookmark, setIsThereAnyBookmark] = useState<true | false>(true);

  const fetchBookmarks = async () => {
    try {
      if (!auth.currentUser) return;
      const { data: bookmarkData } = await axios.get(`/bookmarks?userID=${auth.currentUser.uid}`);
      const bookmarkMovieIDs = await bookmarkData.data.bookmarks.map((bookmark: any) => bookmark.movieID);

      const movies = [];
      for (let i = 0; i < bookmarkMovieIDs.length; i++) {
        const { data: movieData } = await axios.get(`/movies/${bookmarkMovieIDs[i]}`);
        movies.push(movieData.data.movie);
      }

      return movies;
    } catch (err) {
      toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection' : `${err.message}`, { duration: 5000, id: 'fetch-bookmark-error' });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!user) return;
        setIsBookmarkLoading(true);
        const movies = await fetchBookmarks();
        setIsBookmarkLoading(false);
        if (movies) {
          setBookmarkedMovies(movies);
          movies.length === 0 && setIsThereAnyBookmark(false);
        }

      } catch (err) {
        toast.error(err.message.includes('timeout') ? 'Failed to fetch! Please check your internet connection' : `${err.message}`, { duration: 5000, id: 'get-bookmark-error' });
      }
    })();
  }, [user]);

  return (
    <>
      <div className="container">

        <div className="back-button">
          <BackButton />
        </div>

        <div className="no-bookmark-message">
          {
            isThereAnyBookmark || <h2>You don't have any bookmark(s), find a good movie and bookmark it!</h2>
          }
        </div>

        <div className="bookmark-grid">
          {
            isBookmarkLoading && <Spinner />
          }
          {
            bookmarkedMovies.map(movie => (
              <Movie key={movie._id} movie={movie} bigPoster={true} />
            ))
          }
        </div>
      </div>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default BookmarkList;