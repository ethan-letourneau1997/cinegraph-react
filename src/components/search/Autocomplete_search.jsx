import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Input, Text } from '@mantine/core';
import AutocompleteResults from './AutocompleteResults';
import { Search } from 'tabler-icons-react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  modalTitle: {
    width: '100%'
  },
  modalInput: {
    border: 'transparent'
  }
}));

const AutocompleteSearch = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY = '0fd7a8764e6522629a3b7e78c452c348';

  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodedQuery}&language=en-US`
      );

      console.log(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodedQuery}&language=en-US`
      );

      const data = await response.json();

      // Filter the results with 'movie' or 'tv' media_type
      const filteredResults = data.results.filter(
        (result) => result.media_type === 'movie' || result.media_type === 'tv'
      );

      // Fetch credits for filtered 'movie' and 'tv' results
      const resultsWithCredits = await Promise.all(
        filteredResults.map(async (result) => {
          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/${result.media_type}/${result.id}/credits?api_key=${API_KEY}&language=en-US`
          );
          const creditsData = await creditsResponse.json();
          result.credits = creditsData;
          return result;
        })
      );

      // Append the results with 'movie' or 'tv' media_type to the original results
      const updatedResults = data.results.map((result) => {
        if (result.media_type === 'movie' || result.media_type === 'tv') {
          const matchingResult = resultsWithCredits.find((res) => res.id === result.id);
          if (matchingResult) {
            return matchingResult;
          }
        }
        return result;
      });

      setMovies(updatedResults);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleInputKeyUp = (e) => {
    if (e.key === 'Backspace' && query === '') {
      setMovies([]);
    }
  };

  return (
    <div>
      <Modal.Root opened={opened} onClose={close} size="lg" yOffset="10vh">
        <Modal.Overlay opacity={0.7} blur={2} />
        <Modal.Content className={classes.modalInput}>
          <Modal.Header>
            <Modal.Title className={classes.modalTitle}>
              <Input
                icon={<Search size="1rem" />}
                placeholder="Search Movies, TV shows, People"
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyUp={handleInputKeyUp}
                variant="unstyled"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AutocompleteResults results={movies} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Group position="center">
        <Button
          radius="md"
          variant="default"
          pr={100}
          c="dimmed"
          onClick={open}
          color="gray"
          leftIcon={<Search size="1rem" />}>
          <Text> Search</Text>
        </Button>
      </Group>
    </div>
  );
};

export default AutocompleteSearch;
