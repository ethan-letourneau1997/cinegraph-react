import { Box, Portal, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { Navigation } from './Navigation';

function NavHeadroom() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <div>
      <Portal>
        <Box
          sx={(theme) => ({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: 0,
            height: rem(60),
            zIndex: 1000000,
            transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
            transition: 'transform 400ms ease'
          })}>
          <Navigation />
        </Box>
      </Portal>
    </div>
  );
}

export default NavHeadroom;
