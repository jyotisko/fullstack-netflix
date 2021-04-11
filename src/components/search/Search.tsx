import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Nav from './../utils/Nav';
import BackButton from './../utils/BackButton';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { SearchProvider } from './../../contexts/SearchContext';
import { AuthContext } from './../../contexts/AuthContext';

const Search: React.FC = () => {

  const user = useContext(AuthContext);

  return (
    <>
      <Nav />
      <SearchProvider>
        {
          user ? (
            <div className="search__content">
              <BackButton />
              <SearchForm />
              <SearchResult />
            </div>
          ) : (
            <h1 className='already-logged-in not-logged-in'>You not logged in! <Link to='/login'>Login</Link> now.</h1>
          )
        }
      </SearchProvider>
    </>
  );
}

export default Search;