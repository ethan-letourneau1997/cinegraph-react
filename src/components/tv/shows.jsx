import React, { useState } from 'react';
import { SegmentedControl, Space, Title } from '@mantine/core';
import MediaGrid from '../components/MediaGrid';

function Shows() {
  const [time, setTime] = useState('week');

  const handleTimeChange = (value) => {
    setTime(value);
  };

  return (
    <div>
      <Title mb="md">Trending TV</Title>
      <SegmentedControl
        data={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' }
        ]}
        value={time}
        onChange={handleTimeChange}
        shadow="xl"
        mb="md"
      />
      <MediaGrid key={time} mediaType="tv" time={time} />
    </div>
  );
}

export default Shows;
