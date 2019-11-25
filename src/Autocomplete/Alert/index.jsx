import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.sass';

const Alert = ({ type }) => {
    const alertStyle =
        type === 'noSuggestions' ? styles.warning : styles.danger;

    const alertMessage =
        type === 'noSuggestions'
            ? 'No suggestions were found.'
            : 'There was a problem while fetching the characters.';

    return (
        <div data-test="component-alert" className={alertStyle}>
            <span data-test="alert-message">{alertMessage}</span>
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.string.isRequired
};

export default Alert;
