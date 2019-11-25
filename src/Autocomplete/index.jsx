import React, { useState, useRef, useEffect } from 'react';
import Alert from './Alert';
import Input from './Input';
import Suggestions from './Suggestions';
import useSuggestionsFetcher from './hooks/useSuggestionsFetcher';

const Autocompelte = () => {
    const [query, setQuery] = useState('');
    const {
        suggestions,
        loading,
        error,
        cursor,
        setCursor,
        noSuggestions,
        setShouldFetch
    } = useSuggestionsFetcher(query);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const selectSuggestion = value => {
        setShouldFetch(false);
        setQuery(value);
        setShowSuggestions(false);
        setCursor(-1);
    };

    const handleKeyDown = e => {
        if (e.keyCode === 27) {
            setShowSuggestions(false);
            inputRef.current.blur();
        } else if (e.keyCode === 38) {
            setCursor(prevCursor => (cursor > 0 ? prevCursor - 1 : prevCursor));
        } else if (e.keyCode === 40) {
            setCursor(prevCursor =>
                cursor < suggestions.length - 1 ? prevCursor + 1 : prevCursor
            );
        } else if (e.keyCode === 13) {
            e.preventDefault();
            const suggestion = suggestions[cursor];
            if (suggestion) {
                selectSuggestion(suggestion.name);
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div data-test="component-autocomplete">
            <Input
                inputRef={inputRef}
                value={query}
                placeholder="Search terms"
                curlyCorners={suggestions.length && showSuggestions}
                loading={loading}
                onFocus={() => setShowSuggestions(true)}
                onChange={e => setQuery(e.target.value)}
            />
            {showSuggestions && (
                <Suggestions
                    suggestions={suggestions}
                    cursor={cursor}
                    selectSuggestion={selectSuggestion}
                />
            )}
            <div data-test="component-alert">
                {error && <Alert type="" />}
                {noSuggestions && <Alert type="noSuggestions" />}
            </div>
        </div>
    );
};

export default Autocompelte;
