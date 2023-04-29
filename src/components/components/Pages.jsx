import { useState } from 'react';
import { Pagination } from '@mantine/core';

function Pages() {
  const [activePage, setPage] = useState(1);
  return <Pagination value={activePage} onChange={setPage} total={10} />;
}

export default Pages;
