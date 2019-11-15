import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/Suggestions.module.sass';

const Suggestions = ({ suggestions, selectSuggestion }) => {
    return (
        <div
            data-test='component-suggestions'
            className={styles.suggestionsContainer}>
            <ul>
                {suggestions.length > 0 &&
                    suggestions.map(({ name, id }) => (
                        <li
                            data-test='suggestion-list'
                            key={id}
                            onClick={() => selectSuggestion(name)}>
                            {name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

Suggestions.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    selectSuggestion: PropTypes.func.isRequired
};

export default Suggestions;