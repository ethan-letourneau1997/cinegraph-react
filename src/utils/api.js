import _fetch from 'isomorphic-fetch';

async function fetchTrendingTitles(media_type, page, time) {
  const apiKey = '0fd7a8764e6522629a3b7e78c452c348';
  const url = `https://api.themoviedb.org/3/trending/${media_type}/${time}?api_key=${apiKey}&language=en-US&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Faled to fetch trending titles');
  }
}

export async function fetchSearchResults(query) {
  const apiKey = '0fd7a8764e6522629a3b7e78c452c348';
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Faled to fetch trending titles');
  }
}

export default fetchTrendingTitles;
