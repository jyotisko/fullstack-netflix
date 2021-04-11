import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { AuthContext } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Nav from './../utils/Nav';
import { labelAnimation, ckeckValidity } from './functions';

const Signup: React.FC = () => {

  const user = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    let loadingToast;
    try {
      loadingToast = toast.loading('Signing you up! Hold on!', { id: 'signing-up' });
      e.preventDefault();
      await auth.createUserWithEmailAndPassword(email, password);
      toast.dismiss(loadingToast);
      history.push('/home');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(`Something went wrong!\n${err.message}`, { id: 'something-went-wrong-signup', duration: 5000 });
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
                <h3 className="form__text">Sign up</h3>
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
                    <input onFocus={labelAnimation} value={password} onChange={e => {
                      setPassword(e.target.value)
                      ckeckValidity(e, 'password')
                    }} className='form__input' type='password' required />
                  </div>
                </div>
                <button type='submit'>Sign In</button>
                <div className="already-have-account-text">
                  <h5>Already have an account? <Link to='/login'>Login</Link></h5>
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
