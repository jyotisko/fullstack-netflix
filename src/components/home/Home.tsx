import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../contexts/AuthContext';
import Nav from './Nav';
import Header from './Header';
import MovieList from './MovieList';

const Home: React.FC = () => {

  const user = useContext(AuthContext);

  return (
    <>
      {
        user ? (
          <>
            <Nav />
            <Header />
            <MovieList />
          </>
        ) : (
          <h1 className="already-logged-in not-logged-in">You are not logged in! <Link to='/login'>Login</Link> now.</h1>
        )
      }
    </>
  );
}

export default Home;