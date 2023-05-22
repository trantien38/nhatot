import React, { useState } from 'react';

export const useDelayTimeout = (timeout = 1000) => {
  const [delay, setDelay] = useState(null);

  const delayTimeout = (callback, ms = timeout) => {
    if (delay) {
      clearTimeout(delay);
    }

    const dl = setTimeout(() => callback(), ms);

    setDelay(dl);
  };

  React.useEffect(() => {
    return () => {
      if (delay) {
        clearTimeout(delay);
      }
    };
  }, []);

  return delayTimeout;
};