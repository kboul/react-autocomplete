import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { getCharactersService } from '../getCharactersService';

const useSuggestionsFetcher = query => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [noSuggestions, setNoSuggestions] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        let ignore = false;
        setShouldFetch(true);

        const fetchSuggestions = debounce(async () => {
            if (query.length < 2) {
                setSuggestions([]);
                setNoSuggestions(false);
                return;
            }
            if (!ignore && shouldFetch) {
                setError(false);
                setLoading(true);
                try {
                    const {
                        data: {
                            data: { results }
                        }
                    } = await getCharactersService(query);
                    setSuggestions(results);
                    setCursor(-1);
                    setNoSuggestions(results.length === 0 ? true : false);
                } catch (err) {
                    if (err.status !== 200) {
                        setError(true);
                    }
                }
                setLoading(false);
            }
        }, 1000);
        fetchSuggestions();
        return () => {
            ignore = true;
        };
    }, [query]);

    return {
        suggestions,
        loading,
        error,
        cursor,
        setCursor,
        noSuggestions,
        setShouldFetch
    };
};

export default useSuggestionsFetcher;
