import React from 'react';
import { useIsFetching } from 'react-query';

function Fetching() {
  const isFetching = useIsFetching();
  return (
    <div className="fixed top-2 right-2 ">
      {isFetching ? (
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </span>
      ) : (
        ''
      )}
    </div>
  );
}

export default Fetching;
