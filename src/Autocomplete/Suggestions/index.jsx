import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.sass';

const Suggestions = ({ suggestions, selectSuggestion, cursor }) => {
    const ulStyle = suggestions.length ? styles.ulExpanded : styles.ulCollapsed;
    const liStyle = index => (cursor === index ? styles.selectedItem : null);
    return (
        <div
            data-test="component-suggestions"
            className={styles.suggestionsContainer}>
            <ul className={ulStyle}>
                {suggestions.map(({ name, id }, index) => (
                    <li
                        data-test="suggestion-list"
                        key={id}
                        className={liStyle(index)}>
                        <span
                            onClick={() => selectSuggestion(name)}
                            onKeyDown={() => {}}
                            tabIndex="-1"
                            role="button">
                            {name}
                        </span>
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
    selectSuggestion: PropTypes.func.isRequired,
    cursor: PropTypes.number.isRequired
};

export default Suggestions;
