import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { Container } from '@mantine/core';
import Home from './components/Home';
import Movies from './components/movies/movies';
import Shows from './components/tv/shows';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import NavHeadroom from './components/navigation/NavHeadroom';

function App() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <div>
      {/* <AppShell p="lg"> */}
      <NavHeadroom />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/" element={<Movies />} />
        <Route path="/tv/" element={<Shows />} />
      </Routes>
      {/* </AppShell> */}
    </div>
  );
}

export default App;
