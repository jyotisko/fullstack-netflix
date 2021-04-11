import { FormEvent, useState, useContext } from "react";
import { SearchContext } from './../../contexts/SearchContext';

const SearchForm: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [, setSearch] = useContext(SearchContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearch({
      name: name,
      type: type
    });
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Movie Name" />
      <select value={type} onChange={e => setType(e.target.value)} name="type-select">
        <option value="" defaultChecked>All</option>
        <option value="originals">Netflix Originals</option>
        <option value="action">Action</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;