import { useEffect, useState } from "react";

export const useFetch = (fetcher) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetcher();

      setData(data)
    })()
  }, []);

  return data;
};