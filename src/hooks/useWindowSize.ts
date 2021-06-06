import React, { useState, useEffect } from 'react';
import debounce  from 'lodash.debounce';

function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useWindowSize(debounceDelay = 500) {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    const debounced = debounce(handleResize, debounceDelay);
    window.addEventListener(`resize`, debounced);

    return () => window.removeEventListener('resize', debounced);
  }, [debounceDelay]);

  return windowSize;
}
