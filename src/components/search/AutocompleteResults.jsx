import {
  Flex,
  AspectRatio,
  Image,
  Stack,
  Group,
  createStyles,
  Text,
  ScrollArea
} from '@mantine/core';

const AutocompleteResults = ({ results }) => {
  return (
    <Stack>
      {results.map((item) => {
        const hasPosterPath = Boolean(item.poster_path);
        const hasProfilePath = Boolean(item.profile_path);

        // Display the item only if it has either a poster_path or profile_path
        if (hasPosterPath || hasProfilePath) {
          return (
            <Flex key={item.id} gap="lg" pr={10}>
              <Group>
                <AspectRatio ratio={2 / 3} miw={60}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${
                      hasPosterPath ? item.poster_path : item.profile_path
                    }`}
                    alt={item.title}
                    withPlaceholder
                  />
                </AspectRatio>
              </Group>
              <Group>
                <Stack justify="flex-start" spacing="0">
                  <Text fw={700} lineClamp={1}>
                    {item.title}
                    {item.name}
                  </Text>
                  {item.release_date || item.first_air_date ? (
                    <Text c="dimmed" fz="sm">
                      {item.release_date && item.release_date.substring(0, 4)}
                      {item.first_air_date && item.first_air_date.substring(0, 4)}
                    </Text>
                  ) : null}

                  <Text truncate>
                    {item.known_for
                      ? item.known_for.slice(0, 1).map((known, index) => (
                          <Text span key={known.id} c="dimmed" fz="sm">
                            {known.name}
                            {known.title}
                            {known.release_date && `(${known.release_date.substring(0, 4)})`}
                            {known.first_air_date && `(${known.first_air_date.substring(0, 4)})`}
                            {index !== item.known_for.slice(0, 1).length - 1 ? ',' : ''}
                            &nbsp;
                          </Text>
                        ))
                      : null}
                    {item.credits && item.credits.cast
                      ? item.credits.cast.slice(0, 2).map((credit, index) => (
                          <Text span key={credit.id} c="dimmed" fz="sm">
                            {credit.name}
                            {index !== item.credits.cast.slice(0, 2).length - 1 ? ',' : ''}
                            &nbsp;
                          </Text>
                        ))
                      : null}
                  </Text>
                </Stack>
              </Group>
            </Flex>
          );
        }

        // Return null if the item doesn't have a poster_path or profile_path
        return null;
      })}
    </Stack>
  );
};

export default AutocompleteResults;
