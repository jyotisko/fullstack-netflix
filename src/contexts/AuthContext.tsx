import React from 'react';
import { createContext, useState } from 'react';
import { auth } from './../firebase/firebase';

export const AuthContext = createContext(false);

export const AuthProvider: React.FC = (props: any) => {

  const [user, setUser] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user) setUser(true);
    if (!user) setUser(false);
  });

  return (
    <AuthContext.Provider value={user}>
      {props.children}
    </AuthContext.Provider>
  );
};
