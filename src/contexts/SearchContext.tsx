import React from 'react';
import { createContext, useState } from 'react';

export const SearchContext = createContext<any>('');

export const SearchProvider: React.FC = (props: any) => {

  interface Search {
    name: string,
    type: string
  };

  const [search, setSearch] = useState<Search>({ name: '', type: '' });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
