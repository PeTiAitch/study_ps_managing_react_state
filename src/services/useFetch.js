import { useState, useEffect, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (url) => {
  const isMountedRef = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMountedRef.current = true;
    const init = async () => {
      try {
        const response = await fetch(`${baseUrl}${url}`);
        if (response.ok) {
          const json = await response.json();
          if (isMountedRef.current) {
            setData(json);
          }
        } else {
          throw response;
        }
      } catch (e) {
        if (isMountedRef.current) {
          setError(e);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };
    init();

    return () => (isMountedRef.current = false);
  }, [url]);

  return { data, error, loading };
};

export default useFetch;

export function Fetch({ url, render }) {
  const { data, loading, error } = useFetch(url);
  return render(data, loading, error);
}
