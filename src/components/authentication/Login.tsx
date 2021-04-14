import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Nav from './../utils/Nav';
import { ckeckValidity, labelAnimation } from './functions';

const Signup: React.FC = () => {

  const user = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let loadingToast;
    try {
      loadingToast = toast.loading('Loging you in! Hold on.', { id: 'login-toast' });
      await auth.signInWithEmailAndPassword(email, password);
      toast.dismiss(loadingToast);
      history.push('/home');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(`Something went wrong!\n${err.message}`, { id: 'something-went-wrong-login', duration: 5000 });
    }
  };

  return (
    <>
      <section className="section-in-signup">
        <Nav />

        {
          user ? (
            <h1 className='already-logged-in'>You are already logged in! Go to <Link to='/home'>Home</Link></h1>
          ) : (
            <div className="form-container">
              <form className="form form-signup" onSubmit={handleSubmit}>
                <h3 className="form__text">Login</h3>
                <div className="form__fields">
                  <div onClick={labelAnimation} className="form__fields__field">
                    <label className='form__label'>Email</label>
                    <input onFocus={labelAnimation} value={email} onChange={e => {
                      setEmail(e.target.value)
                      ckeckValidity(e, 'email')
                    }} className='form__input' type='email' required />
                  </div>
                  <div onClick={labelAnimation} className="form__fields__field">
                    <label className='form__label'>Password</label>
                    <input minLength={6} onFocus={labelAnimation} value={password} onChange={e => {
                      setPassword(e.target.value)
                      ckeckValidity(e, 'password')
                    }} className='form__input' type='password' required />
                  </div>
                </div>
                <button type='submit'>Login</button>
                <div className="already-have-account-text dont-have-anaccount-text">
                  <h5>Don't have an account? <Link to='/signup'>Sign up</Link> </h5>
                </div>
              </form>
            </div>
          )
        }

      </section>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default Signup;