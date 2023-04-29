import { useEffect, useState } from 'react';
import fetchTrendingTitles from '../../utils/api';
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Pagination,
  AspectRatio,
  Center,
  Space,
  Grid
} from '@mantine/core';
import Pages from './Pages';

function MediaGrid({ mediaType, time }) {
  const [titles, setTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [mediaLoadingStates, setMediaLoadingStates] = useState([]);

  useEffect(() => {
    // Reset currentPage to 1 when the route changes
    setCurrentPage(1);
  }, [location.pathname]); // Listen for changes in the route path

  useEffect(() => {
    fetchTitles(currentPage);
  }, [currentPage, mediaType]); // Include mediaType as a dependency

  async function fetchTitles(page) {
    try {
      const results = await fetchTrendingTitles(mediaType, page, time);
      setTitles(results);
      // setMediaLoadingStates(new Array(results.length).fill(true));

      // Assuming the total number of pages is available in the response
      const totalPageCount = results.total_pages;
      setTotalPages(totalPageCount);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // function handleImageLoaded(index) {
  //   setMediaLoadingStates((prevState) => {
  //     const newState = [...prevState];
  //     newState[index] = false;
  //     return newState;
  //   });
  // }

  return (
    <div>
      <Grid cols={6} gutter="xl">
        {titles.map((title, index) => {
          const imageUrl = `http://image.tmdb.org/t/p/w780${title.poster_path}`;
          return (
            <Grid.Col span={2} style={{ display: 'flex' }}>
              <Card
                shadow="xl"
                padding="sm"
                radius="md"
                withBorder
                key={title.id}
                style={{ width: '100%' }}>
                <Card.Section>
                  {/* <Skeleton visible={mediaLoadingStates[index]}> */}
                  <AspectRatio ratio={2 / 3}>
                    {/* <Image src={imageUrl} onLoad={() => handleImageLoaded(index)} /> */}
                    <Image src={imageUrl}></Image>
                  </AspectRatio>
                  {/* </Skeleton> */}
                </Card.Section>
                <Space h="xs" />
                <Text fw={700} lineClamp={2}>
                  {title.title}
                </Text>
                <Text fw={700} lineClamp={2}>
                  {title.name}
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <Space h="xl" />
      <Center>
        <Pagination
          total={500}
          value={currentPage}
          onChange={handlePageChange}
          withGoTo
          limit={5}
        />
      </Center>
      <Space h="xl" />
    </div>
  );
}

export default MediaGrid;
