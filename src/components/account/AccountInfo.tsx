import { FormEvent, useState, useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BackButton from './../utils/BackButton';
import Spinner from './../utils/Spinner';
import { AuthContext } from './../../contexts/AuthContext';
import { auth, storage } from './../../firebase/firebase';

const AccountInfo: React.FC = () => {

  const user = useContext(AuthContext);

  const [name, setName] = useState<string>();
  const [file, setFile] = useState<File>();
  const [isUpdating, setIsUpdating] = useState<true | false>(false);
  const [isChanged, setIsChanged] = useState<true | false>(false);

  useEffect(() => {
    if (!auth.currentUser?.displayName) return;
    setName(auth.currentUser.displayName);
  }, [auth.currentUser?.displayName]);

  const checkIfChanged = (value: any, type: string) => {
    if (type === 'name') {
      if (auth.currentUser?.displayName === value && !file) return setIsChanged(false);
      if (auth.currentUser?.displayName !== value && !file) return setIsChanged(true);
    } else if (type === 'file') {
      if (!value) return setIsChanged(false);
      if (value) return setIsChanged(true);
    }
  };

  const uploadFile = async () => {
    try {
      if (!file) return;
      const getUniqueProfilePicName = (file: File) => `${auth.currentUser && auth.currentUser.uid}.${file.name.split('.')[file.name.split('.').length - 1]}`;
      const storageRef = storage.ref(`profilePictures/${getUniqueProfilePicName(file)}`);
      const snapshot = await storageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      await auth.currentUser?.updateProfile({ photoURL: downloadURL });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const setNewName = async () => {
    try {
      if (!name) return;
      await auth.currentUser?.updateProfile({ displayName: name })
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await uploadFile();
      await setNewName();
      setIsUpdating(false);
    } catch (err) {
      setIsUpdating(false);
      toast.error(`Something went wrong! ${err.message}`, { id: 'error-account', duration: 5000 });
    }
  };

  return (
    <>
      <div className="back-btn">
        <BackButton />
      </div>
      {
        user ? (
          <div className="account__content">
            <div className="profile__pic">
              <img src={auth.currentUser?.photoURL || process.env.REACT_APP_DEFAULT_USER_ICON} alt="User Logo" />
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="group">
                <label htmlFor="user-icon">Change Profile Picture</label>
                <input onChange={(e: any) => {
                  setFile(e.currentTarget.files[0])
                  checkIfChanged(e.currentTarget.files[0], 'file');
                }} type="file" />
              </div>
              <div className="group">
                <label htmlFor="name">Name</label>
                <input id="name" value={name} onChange={e => {
                  setName(e.target.value)
                  checkIfChanged(e.target.value, 'name');
                }} type="text" />
              </div>
              <div className="button">
                {isUpdating && <Spinner />}

                {
                  isChanged ? (
                    <button type="submit" className={isUpdating ? 'updating' : ''}>
                      Update Account
                    </button>
                  ) : (
                    <button disabled type="submit">
                      Update Account
                    </button>
                  )
                }
              </div>
            </form>
          </div>
        ) : <h1>You are not logged in</h1>
      }
      <Toaster position='bottom-center' toastOptions={{ className: 'toast' }} />
    </>
  );
}

export default AccountInfo;