import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthContext';
import Nav from './../utils/Nav';
import BookmarkList from './BookmarkList';

const Bookmark: React.FC = () => {

  const user = useContext(AuthContext);

  return (
    <>
      {
        user ? (
          <>
            <Nav />
            <BookmarkList />
          </>
        ) : (
          <h1 className="already-logged-in not-logged-in">You are not logged in! <Link to='/login'>Login</Link> now.</h1>
        )
      }
    </>
  );
}

export default Bookmark;