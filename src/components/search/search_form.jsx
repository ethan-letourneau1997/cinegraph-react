import React, { useState } from 'react';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY = '0fd7a8764e6522629a3b7e78c452c348';

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;

// import React, { useState } from 'react';
// import { Input } from '@mantine/core';
// import { Search } from 'tabler-icons-react';

// function SearchForm() {
//   return (
//     <div>
//       {' '}
//       <Input icon={<Search size="1rem" />} placeholder="Your twitter" />
//     </div>
//   );
// }

// export default SearchForm;
