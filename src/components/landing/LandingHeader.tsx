import logo from './../../assets/logo.svg';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LandingHeader: React.FC = () => {

  const [user, setUser] = useState(false);
  const isUser = useContext(AuthContext);

  useEffect(() => {
    if (isUser) setUser(true);
    if (!isUser) setUser(false);
  }, [isUser]);

  return (
    <>
      <header className="header__landing">
        <nav className='home-nav'>
          <div className="logo">
            <img src={logo} alt="Netflix Logo" />
          </div>
          <div className="login-box">
            {
              user ? <Link to='/home' className='signin'>Explore Netflix</Link> : <Link to='/signup' className='signin'>Sign Up</Link>
            }
          </div>
        </nav>

        <div className="container">
          <div className="text">
            <h1>Unlimited movies, TV <br /> shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h5>Ready to watch? Enter your email to create or restart your membership.</h5>
          </div>
          <div className="login-box-container">
            <div className="login-box">
              {
                user ? <Link to='/home' className='signin'>Explore Netflix</Link> : <Link to='/signup' className='signin'>Sign Up</Link>
              }
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default LandingHeader;