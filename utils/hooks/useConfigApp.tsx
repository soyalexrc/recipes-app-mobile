import { useState, useEffect } from 'react';
import sleep from '../sleep';

export const useDataFetcher = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
         await sleep(2000);
         setIsReady(true);
    };

    fetchData();
  }, []);

  return {isReady};
};