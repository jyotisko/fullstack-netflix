import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { auth } from './../../firebase/firebase';
import logo from './../../assets/logo.svg';
import search from './../../assets/search.svg';

const Nav: React.FC = () => {

  const [isUserOptionsOpened, setIsUserOptionsOpened] = useState<true | false>(false);

  const showSweetAlertModal = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once you logout, you will have to login again with your email and password',
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then(doLogout => {
      if (doLogout) auth.signOut();
    });
  };

  return (
    <nav className="home__nav">
      <div className="home__nav__logo">
        <img src={logo} alt="Netflix Logo" />
      </div>
      <div className="home__nav__options">
        <div className="search">
          <Link to="search">
            <img src={search} alt="Search" /> <h4>Search</h4>
          </Link>
        </div>
        <div className="user">
          <img onClick={() => setIsUserOptionsOpened(previousValue => !previousValue)} src={auth.currentUser?.photoURL || process.env.REACT_APP_DEFAULT_USER_ICON} alt="User Logo" />
          {
            isUserOptionsOpened && (
              <div className="user__options">
                <h3><Link to='/account'>My Account</Link></h3>
                <h3><Link to='/bookmark'>My List</Link></h3>
                <h3 onClick={showSweetAlertModal}>Log out</h3>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Nav;